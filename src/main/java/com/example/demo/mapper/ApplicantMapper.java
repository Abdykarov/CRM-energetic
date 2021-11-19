package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.ApplicantRequestDto;
import com.example.demo.dto.response.ApplicantResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {EdrMapper.class, AreaMapper.class, SalesmanMapper.class})
public interface ApplicantMapper {

    UserEntity toEntity(ApplicantRequestDto applicantRequestDto);

    ApplicantResponseDto toResponse(UserEntity userEntity);

    List<ApplicantResponseDto> toListResponse(List<UserEntity> users);
}
