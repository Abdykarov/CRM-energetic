package com.example.demo.service;

import com.example.demo.domain.FactureEntity;
import com.example.demo.dto.request.FactureRequestDto;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface FactureService {
    List<FactureEntity> findAll();

    HttpStatus generateFacture(FactureRequestDto factureRequestDto);
}
