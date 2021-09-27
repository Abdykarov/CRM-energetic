package com.example.demo.mapper;

import com.example.demo.domain.EmailEntity;
import com.example.demo.dto.request.EmailRequestDto;
import com.example.demo.dto.response.EmailResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface EmailMapper {
    EmailResponseDto toResponse(EmailEntity emailEntity);

    EmailEntity toEntity(EmailRequestDto emailRequestDto);
}
