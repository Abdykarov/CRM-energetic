package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.UserRequestDto;
import com.example.demo.dto.response.UserResponseDto;
import org.mapstruct.Mapper;

@Mapper(uses = {EdrMapper.class, AreaMapper.class, SalesmanMapper.class})
public interface UserMapper {

    UserEntity toEntity(UserRequestDto userRequestDto);

    UserResponseDto toResponse(UserEntity user);

}
