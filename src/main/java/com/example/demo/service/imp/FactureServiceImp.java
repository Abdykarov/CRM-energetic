package com.example.demo.service.imp;

import com.example.demo.domain.FactureEntity;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.mapper.FactureMapper;
import com.example.demo.repository.FactureRepository;
import com.example.demo.service.FactureService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class FactureServiceImp implements FactureService {

    private final FactureRepository factureRepository;
    private final FactureMapper factureMapper;

    @Override
    public List<FactureEntity> findAll() {
        List<FactureEntity> all = factureRepository.findAll();
        return all;
    }

    @Override
    public HttpStatus generateFacture(FactureRequestDto factureRequestDto) {

        return null;
    }
}
