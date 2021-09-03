package com.example.demo.service;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.SuperContractResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

public interface SuperContractService {

    String deleteContract(Long userId);

    String uploadContract(MultipartFile file, Long userId);
}
