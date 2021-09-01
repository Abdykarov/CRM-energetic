package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.AcceptedResponseDto;
import com.example.demo.dto.EdrResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AcceptedMapper {
    AcceptedResponseDto toResponse(UserEntity userEntity);

}
