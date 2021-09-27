package com.example.demo.service;

import com.example.demo.domain.NoteEntity;
import com.example.demo.dto.request.NoteRequestDto;
import com.example.demo.dto.response.NoteResponseDto;

import java.util.List;

public interface NoteService {
    List<NoteResponseDto> getContactNotes(Long contactId);

    void saveContactNote(NoteRequestDto noteRequestDto);
}
