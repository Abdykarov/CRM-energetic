package com.example.demo.service.imp;


import com.example.demo.domain.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.FveService;
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
public class FveServiceImp implements FveService {
    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/fve/";
    private UserRepository userRepository;

    @Override
    @Transactional
    public String deleteFve(Long userId) {
        try {
            Path path = Paths.get(UPLOADED_FOLDER + String.format("fve_%s", userId));
            log.info("Deleting fve - Deleting file with path {}", path.toString());
            Files.delete(path);

            log.info("Deleting fve - Updating userId {} signedContract attribute", userId);
            final UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
            userEntity.setConnectedFVE(false);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";

    }

    @Override
    @Transactional
    public String uploadFve(MultipartFile file, Long userId) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the file and save it
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + String.format("fve_%s", userId));
            log.info("Uploading fve - Creating file with path {}", path.toString());
            Files.write(path, bytes);

            log.info("Uploading fve - Updating userId {} signedContract attribute", userId);
            final UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
            userEntity.setConnectedFVE(true);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "success";
    }
}
