package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.SalesmanRequestDto;
import com.example.demo.dto.response.SalesmanResponseDto;
import org.mapstruct.Mapper;

@Mapper(uses = AreaMapper.class)
public interface SalesmanMapper {

    UserEntity toEntity(SalesmanRequestDto salesmanRequestDto);

    SalesmanResponseDto toResponse(UserEntity userEntity);

}
