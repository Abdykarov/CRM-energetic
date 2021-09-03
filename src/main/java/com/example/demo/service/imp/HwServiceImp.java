package com.example.demo.service.imp;


import com.example.demo.service.HwService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@AllArgsConstructor
public class HwServiceImp implements HwService {
    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/hw/";
    private final UserServiceImp userService;

    @Override
    public String deleteHw(Long userId) {
        try {
            Path path = Paths.get(UPLOADED_FOLDER + String.format("hw_%s",userId));
            log.info("Deleting supercontract - Deleting file with path {}", path.toString());
            Files.delete(path);

            log.info("Deleting supercontract - Updating userId {} signedContract attribute", userId);
            userService.setHwSunMonitor(false, userId);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";

    }

    @Override
    public String uploadHw(MultipartFile file, Long userId) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the file and save it
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + String.format("hw_%s",userId));
            log.info("Uploading supercontract - Creating file with path {}", path.toString());
            Files.write(path, bytes);

            log.info("Uploading supercontract - Updating userId {} signedContract attribute", userId);
            userService.setHwSunMonitor(true, userId);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "success";
    }
}
