package com.example.demo.service;

import com.example.demo.dto.response.ContactResponseDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ContactService {
    InputStreamResource getContactsCsv();

    void importCsv(MultipartFile file, Long userId) throws IOException;

    Map<String, Object> queryFilter(String orderType, String contactState, String filterType, String name, String surname, int page, int size);
}
