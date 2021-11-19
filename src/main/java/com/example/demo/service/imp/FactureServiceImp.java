package com.example.demo.service.imp;

import com.example.demo.domain.*;
import com.example.demo.dto.fio.FioResponseDto;
import com.example.demo.dto.fio.TransactionResponseDto;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.dto.response.FactureResponseDto;
import com.example.demo.exception.UserStateControlException;
import com.example.demo.mapper.FactureMapper;
import com.example.demo.repository.FactureRepository;
import com.example.demo.repository.NoteRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.FactureService;
import com.lowagie.text.DocumentException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
@Slf4j
public class FactureServiceImp implements FactureService {

    private final MailServiceImp mailService;
    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final FactureRepository factureRepository;
    private final FactureMapper factureMapper;
    private final NotificationServiceImpl notificationService;

    @Autowired
    private final RestTemplate restTemplate;

    @Autowired
    private final TemplateEngine templateEngine;

    @Autowired
    ServletContext servletContext;

    @Override
    public ResponseEntity<ByteArrayResource> getFacturePdf(Long factureId) {
        final FactureEntity factureEntity = factureRepository.findById(factureId)
                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));
        Map<String,Object> studentMap = new HashMap<>();

        studentMap.put("factureId", factureEntity.getId());
        studentMap.put("name", factureEntity.getUser().getName());
        studentMap.put("surname", factureEntity.getUser().getSurname());
        studentMap.put("ico", factureEntity.getUser().getIco());
        studentMap.put("area", factureEntity.getUser().getArea().getName());
        studentMap.put("phone", factureEntity.getUser().getPhone());
        studentMap.put("email", factureEntity.getUser().getEmail());
        studentMap.put("creationDate", factureEntity.getCreatedAt());
        studentMap.put("untilDate", factureEntity.getDueDate());
        studentMap.put("price", factureEntity.getTotalPrice());
        studentMap.put("vs", factureEntity.getVarSymbol());

//        studentMap.put("address", factureEntity.getUser().getAddress();
        ByteArrayResource resource = null;
        Long fileLength = null;
        try {
            String property = "java.io.tmpdir";
            String tempDir = System.getProperty(property);
            ArrayList<?> createPdfList = createPdf("facture", studentMap);
            String fileNameUrl = (String) createPdfList.get(0);
            fileLength = (Long) createPdfList.get(1);
            Path path = Paths.get(tempDir+"/" + fileNameUrl);
            resource = new ByteArrayResource(Files.readAllBytes(path));
        } catch (Exception e) {
            e.printStackTrace();
        }

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=facture.pdf");

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(fileLength)
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);
    }

    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/css/**")
                .addResourceLocations("classpath:/css/")
                .setCachePeriod(31556926);
    }

    private static String getCurrentBaseUrl() {
        ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest req = sra.getRequest();
        return req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + req.getContextPath();
    }

    private ArrayList<?> createPdf(String templatename, Map map) throws IOException, DocumentException {

        String fileNameUrl = "";
        Context ctx = new Context();

        if (map != null) {
            Iterator itMap = map.entrySet().iterator();

            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }
        ctx.setVariable("baseUrl", getCurrentBaseUrl());

        String processedHtml = templateEngine.process(templatename, ctx);
        FileOutputStream os = null;
        String factureId = map.get("factureId").toString();
        Long fileLength = null;
        try {
            final File outputFile = File.createTempFile("Facture_"+factureId, ".pdf");
            os = new FileOutputStream(outputFile);
            ITextRenderer itr = new ITextRenderer();
            itr.setDocumentFromString(processedHtml);
            itr.layout();
            itr.createPDF(os, false);
            itr.finishPDF();
            fileLength = outputFile.length();
            fileNameUrl = outputFile.getName();
        }

        finally {
            if (os != null) {
                try {
                    os.close();
                } catch (IOException ignored) { }
            }
        }
        ArrayList list = new ArrayList<>();
        list.add(fileNameUrl);
        list.add(fileLength);
        return list;
    }


    @Override
    public List<FactureResponseDto> findAll() {
        List<FactureEntity> all = factureRepository.findAll();
        final List<FactureResponseDto> responseDtos = all.stream()
                .map(factureMapper::toResponse).collect(Collectors.toList());
        log.info("Fetching all factures | Outgoing list {}", responseDtos);

        return responseDtos;
    }

    @Override
    @Transactional
    public HttpStatus generateRequestFacture(FactureRequestDto factureRequestDto) {
        if(factureRepository.existsByUserId(factureRequestDto.getUserId())){
            throw new UserStateControlException("Faktura už existuje, odstrante existujicí", HttpStatus.CONFLICT);
        }
        final UserEntity user = userRepository.findById(factureRequestDto.getUserId())
                .orElseThrow(EntityNotFoundException::new);
        LocalDate currentDate =  LocalDate.now();
        LocalDate dueToDate =  LocalDate.now().plusDays(14);
        String varSymbol = String.format("2021%04d", user.getId());
        final FactureEntity factureEntity = new FactureEntity()
                .setCreatedAt(currentDate)
                .setDueDate(dueToDate)
                .setFactureStatus(FactureStatus.GENERATED)
                .setVarSymbol(varSymbol)
                .setTotalPrice(BigDecimal.valueOf(5))
                .setUser(user);

        final FactureEntity save = factureRepository.save(factureEntity);
        user.setFactureGenerated(true);
        user.setFactureGeneratedDate(LocalDateTime.now());
        user.setFactureStatus(DocumentStatus.GENERATED);
        return HttpStatus.ACCEPTED;
    }
    
    @Override
    @Transactional
    public void readFioFactures() {
        String token = "9o3pDrfHYXF7aetxCIwbDGmyvwj62LlADb8tDyubeq7e258wn7XkgmNmzJqyYHsC";
        List<FactureEntity> generatedFactures = factureRepository.findAllByFactureStatus(FactureStatus.GENERATED);
        if(generatedFactures.isEmpty()){
            log.warn("Generated factures dont exist");
            return;
        }
        log.info("Generated factures : {}", generatedFactures);
        for(FactureEntity facture : generatedFactures){
            BigDecimal totalReqestPayments = BigDecimal.ZERO;
            FioResponseDto fioResponseDto = restTemplate.getForObject(
                    "https://www.fio.cz/ib_api/rest/periods/" + token +"/"+ facture.getCreatedAt() + "/"
                            + facture.getDueDate() + "/transactions.json",
                    FioResponseDto.class);
            log.info("Fetching fio account | Transaction list : {}", fioResponseDto);
            final List<TransactionResponseDto> transactions = fioResponseDto.getAccountStatement().getTransactionList().getTransaction();
            log.info("Transaction list size : {}", transactions.size());
            for ( TransactionResponseDto transaction : transactions) {
                if(!(transaction.getColumn5() == null)){
                    if (transaction.getColumn5().getValue().equals(facture.getVarSymbol())) {
                        final Double value = transaction.getColumn1().getValue();
                        totalReqestPayments.add(new BigDecimal(value));
                        totalReqestPayments = totalReqestPayments.add(new BigDecimal(value));
                        log.info("Facture required payment {}", value);
                        log.info("Facture VS {} | Total payment value {}", facture.getVarSymbol(), totalReqestPayments);
                    }
                }
            }
            log.info("Facture VS {} | Total payments {}", facture.getVarSymbol(), totalReqestPayments);
            if(!(facture.getTotalPrice() == null)){
                if(totalReqestPayments.compareTo(facture.getTotalPrice()) >= 0){
                    facture.setFactureStatus(FactureStatus.PAID);
                    notificationService.createNotification(facture.getUser().getId(), null, "zaplatil fakturu, stav faktury se změnil na ZAPLACENÝ", NotificationDescType.FACTURE_PAID);
                    log.info("Notification | Facture VS {} is paid!", facture.getVarSymbol());
                }
            }
        }
    }

    @Override
    @Transactional
    public void checkExpiredFactures() {
        log.info("Checking expired factures");
        final LocalDate todayDate = LocalDate.now();
        List<FactureEntity> generatedFactures = factureRepository.findAllByFactureStatus(FactureStatus.GENERATED);

        log.info("Generated factures size {} : {}", generatedFactures.size(), generatedFactures);
        for ( FactureEntity facture : generatedFactures ) {
            if(todayDate.isAfter(facture.getDueDate())){
                log.info("Facture id {} is expired", facture.getVarSymbol());
                facture.setFactureStatus(FactureStatus.EXPIRED);
            }
        }

    }

    @Override
    public List<FactureResponseDto> getAllGenerated(String orderType, String name, int page, int size, String filterAttr) {

        List<FactureEntity> factures = new ArrayList<FactureEntity>();
        Pageable paging = PageRequest.of(page, size);

        Page<FactureEntity> pageFactures;
        if(filterAttr.equals("all") && orderType.equals("asc")){
            pageFactures = factureRepository.findAllByFactureStatusOrderByIdAsc(FactureStatus.GENERATED, paging);
        } else if (filterAttr.equals("all") && orderType.equals("desc")){
            pageFactures = factureRepository.findAllByFactureStatusOrderByIdAsc(FactureStatus.GENERATED, paging);
        }
        else if( name != null){
            pageFactures = factureRepository.findAllByFactureStatusAndUserNameContainingIgnoreCaseOrFactureStatusAndUserSurnameContainingIgnoreCaseOrderByIdAsc(FactureStatus.GENERATED, name, FactureStatus.GENERATED, name, paging);
        }
        else if(filterAttr.equals("var-symbol") && orderType.equals("asc")){
            pageFactures = factureRepository.findByFactureStatusOrderByVarSymbolAsc(FactureStatus.GENERATED, paging);
        }
        else if(filterAttr.equals("var-symbol") && orderType.equals("desc")){
            pageFactures = factureRepository.findByFactureStatusOrderByVarSymbolDesc(FactureStatus.GENERATED, paging);
        }
        else if(filterAttr.equals("created-at") && orderType.equals("asc")){
            pageFactures = factureRepository.findByFactureStatusOrderByCreatedAtAsc(FactureStatus.GENERATED, paging);
        }
        else if(filterAttr.equals("created-at") && orderType.equals("desc")){
            pageFactures = factureRepository.findByFactureStatusOrderByCreatedAtDesc(FactureStatus.GENERATED, paging);
        }
        else if(filterAttr.equals("due-date") && orderType.equals("asc")){
            pageFactures = factureRepository.findByFactureStatusOrderByDueDateAsc(FactureStatus.GENERATED, paging);
        }
        else if(filterAttr.equals("due-date") && orderType.equals("desc")){
            pageFactures = factureRepository.findByFactureStatusOrderByDueDateDesc(FactureStatus.GENERATED, paging);
        }
        else{
            pageFactures = factureRepository.findAllByFactureStatusOrderByIdAsc(FactureStatus.GENERATED, paging);
        }
        factures = pageFactures.getContent();

        return factures.stream().map(factureMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public FactureResponseDto findById(Long userId) {
        final FactureEntity facture = factureRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Facture with such user id not found"));
        return factureMapper.toResponse(facture);
    }

    @Override
    @Transactional
    public HttpStatus deleteFacture(Long userId) {
        final UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User didnt find"));
        final FactureEntity facture = factureRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("Facture with such user id not found"));
        factureRepository.delete(facture);
        user.setFactureGeneratedDate(null);
        user.setFactureGenerated(false);
        user.setFacturePaid(false);
        user.setFacturePaidDate(null);
        user.setFactureSent(false);
        user.setFactureSentDate(null);
        user.setFactureStatus(DocumentStatus.NONE);
        return HttpStatus.OK;
    }


}