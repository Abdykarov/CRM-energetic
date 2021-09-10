package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.AcceptedResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AcceptedMapper {
    AcceptedResponseDto toResponse(UserEntity userEntity);

}
