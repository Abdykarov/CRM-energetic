package com.example.demo.mapper;

import com.example.demo.domain.CustomerEntity;
import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface CustomerMapper {
    CustomerEntity toEntity(CustomerRequestDto customerRequestDto);
    CustomerResponseDto toResponse(CustomerEntity customerEntity);
}
