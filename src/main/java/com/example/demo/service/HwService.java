package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface HwService {
    String deleteHw(Long userId);

    String uploadHw(MultipartFile file, Long userId);
}
