package com.example.demo.service;

import com.example.demo.dto.response.AreaResponseDto;

import java.util.List;

public interface AreaService {


    List<AreaResponseDto> findAllAreas();
}
