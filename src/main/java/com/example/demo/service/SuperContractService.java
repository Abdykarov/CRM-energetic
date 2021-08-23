package com.example.demo.service;

import com.example.demo.dto.SuperContractResponseDto;

import java.util.List;

public interface SuperContractService {

    List<SuperContractResponseDto> getAllContracts();

    SuperContractResponseDto getContractByContractId(Long contractId);

    SuperContractResponseDto getContractByLeadId(Long leadId);


}
