package com.example.demo.service;

import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface EdrService {

    EdrResponseDto registrateEdr(@RequestBody EdrRequestDto edrRequestDto);

    String createRegistrationLink(Long currentId);

    EdrResponseDto saveEdr(EdrRequestDto edrRequestDto);

    String createReferalLink(String email, Long id);

    InputStreamResource getLeadCsv();

    void importCsv(MultipartFile file, Long userId);

    Map<String, Object> findAll(int page, int size);
}
