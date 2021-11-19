package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.ContactRequestDto;
import com.example.demo.dto.request.ReferalContactRequestDto;
import com.example.demo.dto.response.ContactResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {EdrMapper.class, AreaMapper.class})
public interface ContactMapper {
    UserEntity toEntity(ContactRequestDto contactRequestDto);

    ContactResponseDto toResponse(UserEntity userEntity);

    List<ContactResponseDto> toListResponse(List<UserEntity> userEntities);

    UserEntity referalToEntity(ReferalContactRequestDto referalContactRequestDto);
}
