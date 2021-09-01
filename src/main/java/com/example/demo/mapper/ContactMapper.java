package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.ContactRequestDto;
import com.example.demo.dto.ContactResponseDto;
import com.example.demo.dto.SalesmanRequestDto;
import com.example.demo.dto.SalesmanResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface ContactMapper {
    UserEntity toEntity(ContactRequestDto contactRequestDto);

    ContactResponseDto toResponse(UserEntity userEntity);
}
