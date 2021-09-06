package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface SuperContractService {

    String deleteContract(Long userId);

    String uploadContract(MultipartFile file, Long userId);
}
