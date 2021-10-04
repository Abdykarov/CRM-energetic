package com.example.demo.mapper;

import com.example.demo.domain.AreaEntity;
import com.example.demo.dto.response.AreaResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AreaMapper {

    AreaResponseDto toResponse(AreaEntity area);

}
