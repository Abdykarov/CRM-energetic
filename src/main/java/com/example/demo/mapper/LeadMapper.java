package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.LeadResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface LeadMapper {
    LeadResponseDto toResponse(UserEntity userEntity);
}
