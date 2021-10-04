package com.example.demo.service.imp;

import com.example.demo.dto.response.AreaResponseDto;
import com.example.demo.mapper.AreaMapper;
import com.example.demo.repository.AreaRepository;
import com.example.demo.service.AreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AreaServiceImpl implements AreaService {

    private final AreaRepository areaRepository;
    private final AreaMapper areaMapper;

    @Override
    public List<AreaResponseDto> findAllAreas() {
        final List<AreaResponseDto> collect = areaRepository.findAll().stream()
                .map(areaMapper::toResponse)
                .collect(Collectors.toList());
        log.info("Find all areas | Returning areas array : {}", collect);
        return collect;
    }
}
