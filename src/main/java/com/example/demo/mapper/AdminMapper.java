package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.AdminRequestDto;
import com.example.demo.dto.AdminResponseDto;
import com.example.demo.dto.EdrResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AdminMapper {
    AdminResponseDto toResponse(UserEntity userEntity);
    UserEntity toEntity(AdminRequestDto adminRequestDto);
}
