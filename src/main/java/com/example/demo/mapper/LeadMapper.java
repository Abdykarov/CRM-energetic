package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.LeadResponseDto;
import org.mapstruct.Mapper;

@Mapper(uses = {EdrMapper.class, AreaMapper.class, SalesmanMapper.class})
public interface LeadMapper {
    LeadResponseDto toResponse(UserEntity userEntity);
}
