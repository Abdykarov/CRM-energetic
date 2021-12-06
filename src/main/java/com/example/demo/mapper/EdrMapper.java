package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = ContactMapper.class)
public interface EdrMapper {
    EdrResponseDto toResponse(UserEntity userEntity);
    UserEntity toEntity(EdrRequestDto edrRequestDto);

    List<EdrResponseDto> toListResponse(List<UserEntity> users);
}
