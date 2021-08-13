package com.example.demo.service;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.dto.SuperContractResponseDto;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface SuperContractService {

    List<SuperContractResponseDto> getAllContracts();

    SuperContractResponseDto getContractByContractId(Long contractId);

    SuperContractResponseDto getContractByLeadId(Long leadId);


}
