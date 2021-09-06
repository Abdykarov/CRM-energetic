package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface EdrRequestService {
    String uploadRequest(MultipartFile file, Long userId);

    String deleteRequest(Long userId);
}
