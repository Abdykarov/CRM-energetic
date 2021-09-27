package com.example.demo.mapper;

import com.example.demo.domain.FactureEntity;
import com.example.demo.dto.request.FactureRequestDto;
import com.example.demo.dto.response.FactureResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface FactureMapper {

    FactureEntity toEntity(FactureRequestDto factureRequestDto);

    FactureResponseDto toResponse(FactureEntity factureEntity);

}
