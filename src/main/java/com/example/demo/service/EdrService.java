package com.example.demo.service;

import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface EdrService {
    String createReferalLink(Long edrId);

    EdrResponseDto registrateEdr(@RequestBody EdrRequestDto edrRequestDto);

    String createRegistrationLink(Long currentId);

    EdrResponseDto saveEdr(EdrRequestDto edrRequestDto);
}
