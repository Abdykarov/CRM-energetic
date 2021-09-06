package com.example.demo.service;

import com.example.demo.dto.EdrRequestDto;
import com.example.demo.dto.EdrResponseDto;

public interface EdrService {
    EdrResponseDto registrateEdr(EdrRequestDto edrRequestDto);
}
