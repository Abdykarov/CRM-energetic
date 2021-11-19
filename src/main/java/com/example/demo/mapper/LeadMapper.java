package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.LeadResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = {EdrMapper.class, AreaMapper.class, SalesmanMapper.class})
public interface LeadMapper {
    LeadResponseDto toResponse(UserEntity userEntity);

    List<LeadResponseDto> toListResponse(List<UserEntity> users);
}
