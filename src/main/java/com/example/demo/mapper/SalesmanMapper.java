package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.SalesmanRequestDto;
import com.example.demo.dto.SalesmanResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface SalesmanMapper {

    UserEntity toEntity(SalesmanRequestDto salesmanRequestDto);

    SalesmanResponseDto toResponse(UserEntity userEntity);

}
