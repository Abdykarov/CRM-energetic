package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.ContactRequestDto;
import com.example.demo.dto.ContactResponseDto;
import com.example.demo.dto.LeadResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface LeadMapper {
    LeadResponseDto toResponse(UserEntity userEntity);
}
