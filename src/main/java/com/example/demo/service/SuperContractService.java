package com.example.demo.service;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.SuperContractResponseDto;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

public interface SuperContractService {

    List<SuperContractResponseDto> getAllContracts();

    SuperContractResponseDto getContractByContractId(Long contractId);

    SuperContractResponseDto getContractByLeadId(Long leadId);

    Path getContractByUserId(Long userId);

    void generateSuperContract(Long userId) throws IOException;

}
