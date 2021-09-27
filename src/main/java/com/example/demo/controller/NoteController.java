package com.example.demo.controller;

import com.example.demo.domain.EmailEntity;
import com.example.demo.domain.NoteEntity;
import com.example.demo.dto.request.NoteRequestDto;
import com.example.demo.dto.response.NoteResponseDto;
import com.example.demo.service.imp.MailServiceImp;
import com.example.demo.service.imp.NoteServiceImp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("edr_api/edr-notes/")
public class NoteController {

    private final String HEADER_STRING = "Authorization";

    private final String TOKEN_PREFIX = "Bearer";

    private AuthenticationManager authenticationManager;

    private NoteServiceImp noteService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("{contactId}/")
    public List<NoteResponseDto> getContactNotes(@PathVariable Long contactId){
        return noteService.getContactNotes(contactId);
    }

    @PreAuthorize("hasRole('ROLE_MANAGER')")
    @PostMapping
    public void saveContactNote(@RequestBody NoteRequestDto noteRequestDto){
        noteService.saveContactNote(noteRequestDto);
    }

}
