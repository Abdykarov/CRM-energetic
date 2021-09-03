package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface FveService {
    String deleteFve(Long userId);

    String uploadFve(MultipartFile file, Long userId);
}
