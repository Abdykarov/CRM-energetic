package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface SyselService {

    String deleteSysel(Long userId);

    String uploadSysel(MultipartFile file, Long userId);
}
