package com.example.demo.service.imp;

import com.example.demo.domain.DocumentStatus;
import com.example.demo.domain.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.SuperContractService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class SuperContractServiceImpl implements SuperContractService {

    @Value("${file.upload.contracts}")
    private String UPLOADED_FOLDER;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public String deleteContract(Long userId) {
        try {
            Path path = Paths.get(UPLOADED_FOLDER + String.format("supercontract_%s", userId));
            log.info("Deleting supercontract - Deleting file with path {}", path.toString());
            Files.delete(path);

            log.info("Deleting supercontract - Updating userId {} signedContract attribute", userId);
            final UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
            userEntity.setEdrContractSigned(false);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";

    }

    @Override
    @Transactional
    public String uploadContract(MultipartFile file, Long userId) {
        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        try {
            // Get the file and save it
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + String.format("supercontract_%s", userId));
            log.info("Uploading supercontract - Creating file with path {}", path.toString());
            Files.write(path, bytes);

            log.info("Uploading supercontract - Updating userId {} signedContract attribute", userId);
            final UserEntity userEntity = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
            userEntity.setEdrContractSigned(true);
            userEntity.setEdrContractSignedDate(LocalDateTime.now());
            userEntity.setEdrContractStatus(DocumentStatus.SIGNED);
            userRepository.save(userEntity);
            return "success";

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "success";
    }
}
