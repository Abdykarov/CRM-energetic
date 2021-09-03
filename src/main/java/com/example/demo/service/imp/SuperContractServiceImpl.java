package com.example.demo.service.imp;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.SuperContractResponseDto;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.SuperContractService;
import com.lowagie.text.DocumentException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class SuperContractServiceImpl implements SuperContractService {

    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/supercontracts/";
    private final UserServiceImp userService;

    @Override
    public String deleteContract(Long userId) {
        try {
            Path path = Paths.get(UPLOADED_FOLDER + String.format("supercontract_%s",userId));
            log.info("Deleting supercontract - Deleting file with path {}", path.toString());
            Files.delete(path);

            log.info("Deleting supercontract - Updating userId {} signedContract attribute", userId);
            userService.setSignContract(false, userId);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";

    }

    @Override
    public String uploadContract(MultipartFile file, Long userId) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the file and save it
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + String.format("supercontract_%s",userId));
            log.info("Uploading supercontract - Creating file with path {}", path.toString());
            Files.write(path, bytes);

            log.info("Uploading supercontract - Updating userId {} signedContract attribute", userId);
            userService.setSignContract(true, userId);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "success";
    }
}
