package com.example.demo.service.imp;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.SuperContractResponseDto;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.SuperContractService;
import com.lowagie.text.DocumentException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class SuperContractServiceImpl implements SuperContractService {

    PdfService pdfService;
    UserRepository userRepository;

    @Override
    public List<SuperContractResponseDto> getAllContracts() {
        return null;
    }

    @Override
    public SuperContractResponseDto getContractByContractId(Long contractId) {
        return null;
    }

    @Override
    public SuperContractResponseDto getContractByLeadId(Long leadId) {
        return null;
    }

    @Override
    public Path getContractByUserId(Long userId) {
        return null;
    }

    @Override
    public void generateSuperContract(Long userId) throws IOException {
        Context context = new Context();
        context.setVariable("name", "ilias" );
        context.setVariable("surname", "ilias" );
        context.setVariable("email", "ilias" );

        String html = parseThymeleafTemplate(context);
        generatePdfFromHtml(html);
    }

    private String parseThymeleafTemplate(Context context) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        return templateEngine.process("supercontract_template", context);
    }

    public void generatePdfFromHtml(String html) throws IOException {
        String outputFolder = System.getProperty("user.home") + File.separator + "thymeleaf.pdf";
        OutputStream outputStream = new FileOutputStream(outputFolder);

        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(html);
        renderer.layout();
        try {
            renderer.createPDF(outputStream);
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        outputStream.close();
    }

}
