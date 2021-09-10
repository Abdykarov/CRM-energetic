package com.example.demo.service.imp;


import com.example.demo.domain.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.HwService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@AllArgsConstructor
public class HwServiceImp implements HwService {
    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/hw/";
    private UserRepository userRepository;

    @Override
    @Transactional
    public String deleteHw(Long userId) {
        try {
            Path path = Paths.get(UPLOADED_FOLDER + String.format("hw_%s", userId));
            log.info("Deleting supercontract - Deleting file with path {}", path.toString());
            Files.delete(path);

            log.info("Deleting supercontract - Updating userId {} signedContract attribute", userId);
            final UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
            userEntity.setHWSunMonitor(false);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";

    }

    @Override
    @Transactional
    public String uploadHw(MultipartFile file, Long userId) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the file and save it
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + String.format("hw_%s", userId));
            log.info("Uploading supercontract - Creating file with path {}", path.toString());
            Files.write(path, bytes);

            log.info("Uploading supercontract - Updating userId {} signedContract attribute", userId);
            final UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
            userEntity.setHWSunMonitor(true);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "success";
    }
}
