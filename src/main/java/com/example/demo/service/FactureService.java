package com.example.demo.service;

import com.example.demo.domain.FactureEntity;

import java.util.List;

public interface FactureService {
    List<FactureEntity> findAll();
}
