package com.example.demo.controller.document;

import com.example.demo.domain.FactureEntity;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.repository.FactureRepository;
import com.example.demo.service.imp.FactureServiceImp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/edr_api/factures")
public class FactureController {

    private final FactureServiceImp factureService;
    private final FactureRepository factureRepository;

    @GetMapping()
    public List<FactureEntity> findAll() {
        return factureService.findAll();
    }

    @PostMapping("/generate")
    public HttpStatus generateFacture(@RequestBody FactureRequestDto factureRequestDto){
        return factureService.generateFacture(factureRequestDto);
    }

}
