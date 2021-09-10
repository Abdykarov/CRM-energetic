package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.AdminRequestDto;
import com.example.demo.dto.response.AdminResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AdminMapper {
    AdminResponseDto toResponse(UserEntity userEntity);

    UserEntity toEntity(AdminRequestDto adminRequestDto);
}
