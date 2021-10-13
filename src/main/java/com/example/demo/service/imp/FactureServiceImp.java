package com.example.demo.service.imp;

import com.example.demo.domain.FactureEntity;
import com.example.demo.domain.FactureStatus;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.fio.FioResponseDto;
import com.example.demo.dto.fio.TransactionResponseDto;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.dto.response.FactureResponseDto;
import com.example.demo.mapper.FactureMapper;
import com.example.demo.repository.FactureRepository;
import com.example.demo.repository.NoteRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.FactureService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private final RestTemplate restTemplate;

    @Autowired
    ServletContext servletContext;

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

        final UserEntity user = userRepository.findById(factureRequestDto.getUserId())
                .orElseThrow(EntityNotFoundException::new);
        LocalDate currentDate =  LocalDate.now();
        LocalDate dueToDate =  LocalDate.now().plusDays(14);
        String varSymbol = String.format("2021%04d", 321);
        final FactureEntity factureEntity = new FactureEntity()
                .setCreatedAt(currentDate)
                .setDueDate(dueToDate)
                .setFactureStatus(FactureStatus.GENERATED)
                .setVarSymbol(varSymbol)
                .setTotalPrice(BigDecimal.valueOf(5))
                .setUser(user);

        factureRepository.save(factureEntity);
        user.setFactureGenerated(true);
        user.setFactureGeneratedDate(LocalDateTime.now());
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
        List<FactureEntity> expiredFactures = factureRepository.findAllByFactureStatusAndDueDateGreaterThan(FactureStatus.GENERATED, todayDate);
        if(expiredFactures.isEmpty()){
            log.warn("Expired factures don't exist");
            return;
        }
        log.info("Expired factures : {}", expiredFactures);
        for ( FactureEntity facture : expiredFactures ) {
            facture.setFactureStatus(FactureStatus.EXPIRED);

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
        final FactureEntity facture = factureRepository.findByUserId(userId);
        return factureMapper.toResponse(facture);
    }


//    @Override
//    public ResponseEntity<?> getFacturePdf(TemplateEngine templateEngine, HttpServletRequest request, HttpServletResponse response, Long factureId) {
//        /* Do Business Logic*/
//
//        final FactureEntity factureEntity = factureRepository.findById(factureId)
//                .orElseThrow(() -> new EntityNotFoundException("Entity not found"));
//
//        /* Create HTML using Thymeleaf template Engine */
//
//        WebContext context = new WebContext(request, response, servletContext);
//        context.setVariable("factureEntity", factureEntity);
//        String orderHtml = templateEngine.process("facture", context);
//
//        /* Setup Source and target I/O streams */
//
//        ByteArrayOutputStream target = new ByteArrayOutputStream();
//
//        /*Setup converter properties. */
//        ConverterProperties converterProperties = new ConverterProperties();
//        converterProperties.setBaseUri("http://localhost:8080");
//
//        /* Call convert method */
//        HtmlConverter.convertToPdf(orderHtml, target, converterProperties);
//
//        /* extract output as bytes */
//        byte[] bytes = target.toByteArray();
//
//
//        /* Send the response as downloadable PDF */
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=facture.pdf")
//                .contentType(MediaType.APPLICATION_PDF)
//                .body(bytes);
//    }
}
