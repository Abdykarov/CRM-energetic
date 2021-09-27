package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.ManagerRequestDto;
import com.example.demo.dto.response.ManagerResponseDto;
import org.mapstruct.Mapper;

@Mapper(uses = UserMapper.class)
public interface ManagerMapper {
    ManagerResponseDto toResponse(UserEntity userEntity);

    UserEntity toEntity(ManagerRequestDto managerRequestDto);
}
