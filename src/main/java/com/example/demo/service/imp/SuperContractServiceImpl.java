package com.example.demo.service.imp;

import com.example.demo.dto.SuperContractResponseDto;
import com.example.demo.service.SuperContractService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class SuperContractServiceImpl implements SuperContractService {
    @Override
    public List<SuperContractResponseDto> getAllContracts() {
        return null;
    }

    @Override
    public SuperContractResponseDto getContractByContractId(Long contractId) {
        return null;
    }

    @Override
    public SuperContractResponseDto getContractByLeadId(Long leadId) {
        return null;
    }
}
