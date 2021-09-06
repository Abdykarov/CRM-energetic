package com.example.demo.controller;

import com.example.demo.domain.FactureEntity;
import com.example.demo.repository.FactureRepository;
import com.example.demo.service.imp.FactureServiceImp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/edr_api/facture")
public class FactureController {

    private final FactureServiceImp factureService;
    private final FactureRepository factureRepository;

    @GetMapping()
    public List<FactureEntity> findAll(){
        return factureService.findAll();
    }


}
