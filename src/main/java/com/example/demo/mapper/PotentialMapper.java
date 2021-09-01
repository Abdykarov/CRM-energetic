package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.EdrResponseDto;
import com.example.demo.dto.PotentialResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface PotentialMapper {
    PotentialResponseDto toResponse(UserEntity userEntity);

}
