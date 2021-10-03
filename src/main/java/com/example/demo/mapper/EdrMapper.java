package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import org.mapstruct.Mapper;

@Mapper(uses = ContactMapper.class)
public interface EdrMapper {
    EdrResponseDto toResponse(UserEntity userEntity);
    UserEntity toEntity(EdrRequestDto edrRequestDto);
}
