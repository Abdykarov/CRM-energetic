package com.example.demo.mapper;

import com.example.demo.domain.NoteEntity;
import com.example.demo.dto.request.NoteRequestDto;
import com.example.demo.dto.response.NoteResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface NoteMapper {
     NoteResponseDto toResponse(NoteEntity noteEntity);

     NoteEntity toEntity(NoteRequestDto noteRequestDto);
}
