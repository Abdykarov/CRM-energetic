package com.example.demo.service.imp;

import com.example.demo.domain.FactureEntity;
import com.example.demo.repository.FactureRepository;
import com.example.demo.service.FactureService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class FactureServiceImp implements FactureService {

    private final FactureRepository factureRepository;

    @Override
    public List<FactureEntity> findAll() {
        List<FactureEntity> all = factureRepository.findAll();
        return all;
    }
}
