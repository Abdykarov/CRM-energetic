package com.example.demo.service.imp;

import com.example.demo.domain.FactureEntity;
import com.example.demo.domain.FactureStatus;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.mapper.FactureMapper;
import com.example.demo.repository.FactureRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.FactureService;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import javax.persistence.EntityNotFoundException;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class FactureServiceImp implements FactureService {

    private final UserRepository userRepository;
    private final FactureRepository factureRepository;
    private final FactureMapper factureMapper;

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
        LocalDateTime currentDate =  LocalDateTime.now();
        LocalDateTime dueToDate =  LocalDateTime.now().plusDays(14);
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
    public void readFactures() {
        List<FactureEntity> generatedFactures = factureRepository.findAllByFactureStatus(FactureStatus.GENERATED);
        log.info("Generated factures : {}", generatedFactures);
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
