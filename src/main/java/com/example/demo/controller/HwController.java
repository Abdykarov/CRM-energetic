package com.example.demo.controller;

import com.example.demo.service.imp.HwServiceImp;
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
@RequestMapping("/edr_api/hw")
public class HwController {

    HwServiceImp hwService;
    private static String UPLOADED_FOLDER = "/home/abdykili/workflow/CRM-energetic/src/main/resources/hw/";

    @RequestMapping(value = "/save/{userId}", method = RequestMethod.POST)
    public String uploadHw(@RequestParam("file") MultipartFile file, @PathVariable Long userId) {
        return hwService.uploadHw(file, userId);
    }

    @RequestMapping(value = "/delete/{userId}", method = RequestMethod.GET)
    public String deleteHw(@PathVariable Long userId) {
        return hwService.deleteHw(userId);
    }

    @GetMapping("/fetch/{userId}")
    public ResponseEntity<ByteArrayResource> getHw(@PathVariable String userId)throws Exception
    {
        File file = new File(UPLOADED_FOLDER + String.format("hw_%s",userId));
        log.info("File path - {}", file);

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, String.format("inline;hw_%s",userId));

        Path path = Paths.get(file.getAbsolutePath());

        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.parseMediaType("application/pdf"))
                .body(resource);
    }

}
