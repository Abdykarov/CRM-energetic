package com.example.demo.service;

import com.example.demo.domain.FactureEntity;
import com.example.demo.dto.request.FactureRequestDto;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.thymeleaf.TemplateEngine;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface FactureService {
    List<FactureEntity> findAll();

    HttpStatus generateRequestFacture(FactureRequestDto factureRequestDto);

    void readFioFactures();

//    ResponseEntity<?> getFacturePdf(TemplateEngine templateEngine, HttpServletRequest request, HttpServletResponse response, Long factureId);
}
