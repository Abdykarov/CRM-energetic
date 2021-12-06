package com.example.demo.mapper;

import com.example.demo.domain.InviteEntity;
import com.example.demo.dto.response.InviteResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface InviteMapper {

    InviteResponseDto toResponse(InviteEntity inviteEntity);



}
