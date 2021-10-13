package com.example.demo.controller;

import com.example.demo.domain.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.imp.SuperContractServiceImpl;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/supercontract")
public class SuperContractController {

    private final UserRepository userRepository;

    SuperContractServiceImpl superContractService;
    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/supercontracts/";
    private static String APP_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/documents/";

    @RequestMapping(value = "/save/{userId}", method = RequestMethod.POST)
    public String uploadSuperContract(@RequestParam("file") MultipartFile file, @PathVariable Long userId) {
        return superContractService.uploadContract(file, userId);
    }

    @RequestMapping(value = "/delete/{userId}", method = RequestMethod.GET)
    public String deleteSuperContract(@PathVariable Long userId) {
        return superContractService.deleteContract(userId);
    }

    @GetMapping("/generate/{userId}")
    @Transactional
    public ResponseEntity<ByteArrayResource> generateContract(@PathVariable Long userId) throws Exception {
        final UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User doesnt exist"));
        if(user.isEdrContractGenerated()){
            user.setEdrContractGenerated(false);
            user.setEdrContractGeneratedDate(LocalDateTime.now());
        }else{
            user.setEdrContractGenerated(true);
            user.setEdrContractGeneratedDate(LocalDateTime.now());
        }
        File file = new File(APP_FOLDER + "supercontract.pdf");
        log.info("File path - {}", file);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=supercontract.pdf");

        Path path = Paths.get(file.getAbsolutePath());

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);
    }

    @GetMapping("/fetch/{userId}")
    public ResponseEntity<ByteArrayResource> getSuperContract(@PathVariable String userId) throws Exception {
        File file = new File(UPLOADED_FOLDER + String.format("supercontract_%s", userId));
        log.info("File path - {}", file);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, String.format("inline;supercontract_%s", userId));

        Path path = Paths.get(file.getAbsolutePath());

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);
    }


}
