package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.PotentialResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface PotentialMapper {
    PotentialResponseDto toResponse(UserEntity userEntity);

}
