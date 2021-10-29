package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.CallCentrumRequestDto;
import com.example.demo.dto.request.SalesmanRequestDto;
import com.example.demo.dto.response.CallCentrumResponseDto;
import com.example.demo.dto.response.SalesmanResponseDto;
import org.mapstruct.Mapper;

@Mapper(uses = AreaMapper.class)
public interface CallCentrumMapper {

    UserEntity toEntity(CallCentrumRequestDto callCentrumRequestDto);

    CallCentrumResponseDto toResponse(UserEntity userEntity);

}
