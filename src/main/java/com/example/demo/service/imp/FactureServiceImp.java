package com.example.demo.service.imp;

import com.example.demo.domain.FactureEntity;
import com.example.demo.domain.FactureStatus;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.fio.FioResponseDto;
import com.example.demo.dto.fio.TransactionResponseDto;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.mapper.FactureMapper;
import com.example.demo.repository.FactureRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.FactureService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
@Slf4j
public class FactureServiceImp implements FactureService {

    private final UserRepository userRepository;
    private final FactureRepository factureRepository;
    private final FactureMapper factureMapper;

    @Autowired
    private final RestTemplate restTemplate;

    @Autowired
    ServletContext servletContext;

    @Override
    public List<FactureEntity> findAll() {
        List<FactureEntity> all = factureRepository.findAll();
        return all;
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
            if(totalReqestPayments.compareTo(facture.getTotalPrice()) >= 0){
                facture.setFactureStatus(FactureStatus.PAID);
                log.info("Notification | Facture VS {} is paid!", facture.getVarSymbol());
            }
        }
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
