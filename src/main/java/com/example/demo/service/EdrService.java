package com.example.demo.service;

import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;

public interface EdrService {
    EdrResponseDto registrateEdr(EdrRequestDto edrRequestDto);
}
