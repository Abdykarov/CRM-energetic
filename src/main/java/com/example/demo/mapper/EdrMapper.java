package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.EdrResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface EdrMapper {
    EdrResponseDto toResponse(UserEntity userEntity);
}
