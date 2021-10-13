package com.example.demo.controller;


import com.example.demo.service.imp.EdrRequestServiceImp;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/edr_request")
public class EdrRequestController {

    private final EdrRequestServiceImp edrRequestService;
    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/edr_request/";
    private static String APP_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/documents/";

    @RequestMapping(value = "/save/{userId}", method = RequestMethod.POST)
    public String uploadRequest(@RequestParam("file") MultipartFile file, @PathVariable Long userId) {
        return edrRequestService.uploadRequest(file, userId);
    }

    @RequestMapping(value = "/delete/{userId}", method = RequestMethod.GET)
    public String deleteRequest(@PathVariable Long userId) {
        return edrRequestService.deleteRequest(userId);
    }

    @GetMapping("/generate/{userId}")
    public ResponseEntity<ByteArrayResource> generateRequest(@PathVariable String userId) throws Exception {
        File file = new File(APP_FOLDER + "request.pdf");
        log.info("File path - {}", file);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "inline;filename=request.pdf");

        Path path = Paths.get(file.getAbsolutePath());

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);
    }

    @GetMapping("/fetch/{userId}")
    public ResponseEntity<ByteArrayResource> getRequest(@PathVariable String userId) throws Exception {
        File file = new File(UPLOADED_FOLDER + String.format("request_%s", userId));
        log.info("File path - {}", file);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, String.format("inline;request_%s", userId));

        Path path = Paths.get(file.getAbsolutePath());

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);
    }


}
