package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.CurrentResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface CurrentMapper {
    CurrentResponseDto toResponse(UserEntity userEntity);
}
