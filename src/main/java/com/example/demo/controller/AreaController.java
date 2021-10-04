package com.example.demo.controller;

import com.example.demo.dto.response.AreaResponseDto;
import com.example.demo.service.imp.AreaServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("edr_api/areas/")
public class AreaController {

    private final AreaServiceImpl areaService;

    @GetMapping
    public List<AreaResponseDto> findAllAreas(){
        return areaService.findAllAreas();
    }

}
