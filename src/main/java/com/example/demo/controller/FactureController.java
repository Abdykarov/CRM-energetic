package com.example.demo.controller;

import com.example.demo.domain.FactureEntity;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.dto.response.FactureResponseDto;
import com.example.demo.repository.FactureRepository;
import com.example.demo.service.imp.FactureServiceImp;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/edr_api/factures")
public class FactureController {

    private final FactureServiceImp factureService;
    private final FactureRepository factureRepository;
    private AuthenticationManager authenticationManager;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping()
    public List<FactureResponseDto> findAll() {
        return factureService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("{userId}")
    public FactureResponseDto findById(@PathVariable Long userId) {
        return factureService.findById(userId);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/generated/{filterAttr}")
    public List<FactureResponseDto> filterGenerated(
            @RequestParam(defaultValue = "asc") String orderType,
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @PathVariable String filterAttr){
        return factureService.getAllGenerated(orderType, name, page, size, filterAttr);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @PostMapping("/generate-request")
    public HttpStatus generateRequestFacture(@RequestBody FactureRequestDto factureRequestDto){
        return factureService.generateRequestFacture(factureRequestDto);
    }

//
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
//    @GetMapping("/facture-request-pdf/{facture-id}")
//    public ResponseEntity<?> getFacturePdf(HttpServletRequest request, HttpServletResponse response, @PathVariable("facture-id") Long factureId) throws Exception {
//        return factureService.getFacturePdf(templateEngine, request, response, factureId);
//    }


}
