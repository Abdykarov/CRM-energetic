package com.example.demo.controller;

import com.example.demo.dto.SuperContractRequestDto;
import com.example.demo.dto.SuperContractResponseDto;
import com.example.demo.service.imp.SuperContractServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/contract")
public class SuperContractController {

    SuperContractServiceImpl superContractService;

    @PostMapping("{leadId}")
    public SuperContractResponseDto createContractAndSend(@RequestBody SuperContractRequestDto superContractRequestDto,
                                                          @PathVariable Long leadId){
       return null;
    }

}
