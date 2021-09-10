package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.ContactRequestDto;
import com.example.demo.dto.response.ContactResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface ContactMapper {
    UserEntity toEntity(ContactRequestDto contactRequestDto);

    ContactResponseDto toResponse(UserEntity userEntity);
}
