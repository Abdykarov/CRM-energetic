package com.example.demo.service.imp;

import com.lowagie.text.DocumentException;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@Service
@AllArgsConstructor
public class PdfService {

    private static final String PDF_RESOURCES = "/pdf-resources/";

    public File generatePdf(Context context, String templateName, String fileName) throws IOException, DocumentException {
        String html = loadAndFillTemplate(context, templateName);
        return renderPdf(html, fileName);
    }


    private File renderPdf(String html, String fileName) throws IOException, DocumentException {
        File file = File.createTempFile(fileName, ".pdf");
        OutputStream outputStream = new FileOutputStream(file);
        ITextRenderer renderer = new ITextRenderer(20f * 4f / 3f, 20);
        renderer.setDocumentFromString(html, new ClassPathResource(PDF_RESOURCES).getURL().toExternalForm());
        renderer.layout();
        renderer.createPDF(outputStream);
        outputStream.close();
        file.deleteOnExit();
        return file;
    }

    private String loadAndFillTemplate(Context context, String templateName) {
        TemplateEngine templateEngine = new TemplateEngine();
        return templateEngine.process(templateName, context);
    }
}
