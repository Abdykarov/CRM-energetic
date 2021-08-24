package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.dto.UserRequestDto;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    UserEntity toEntity(UserRequestDto userRequestDto);

    UserResponseDto toResponse(UserEntity user);

}
