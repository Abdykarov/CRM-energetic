package com.example.demo.mapper;

import com.example.demo.domain.CustomerEntity;
import com.example.demo.domain.EmailEntity;
import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.dto.EmailRequestDto;
import com.example.demo.dto.EmailResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface EmailMapper {

    EmailEntity toEntity(EmailRequestDto emailRequestDto);
    EmailResponseDto toResponse(EmailEntity emailEntity);

}
