package com.example.demo.service.imp;

import com.example.demo.domain.NoteEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.request.NoteRequestDto;
import com.example.demo.dto.response.NoteResponseDto;
import com.example.demo.mapper.NoteMapper;
import com.example.demo.repository.NoteRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoteServiceImp implements NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final NoteMapper noteMapper;

    @Override
    public List<NoteResponseDto> getContactNotes(Long contactId) {
        final UserEntity userEntity = userRepository.findById(contactId)
                .orElseThrow(() -> new EntityNotFoundException("nout found"));
        List<NoteEntity> notes = noteRepository.findAllByUser(userEntity);
        return notes.stream()
                .map(noteMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void saveContactNote(NoteRequestDto noteRequestDto) {
        final NoteEntity noteEntity = noteMapper.toEntity(noteRequestDto);
        final UserEntity userEntity = userRepository.findById(noteRequestDto.getUserId())
                        .orElseThrow(() -> new EntityNotFoundException("User with such id doesnt exist"));
        final UserEntity managerEntity = userRepository.findById(noteRequestDto.getManagerId())
                        .orElseThrow(() -> new EntityNotFoundException("Manager with such id doesnt exist"));
        if(noteRequestDto.getUserId().equals(noteRequestDto.getManagerId())){
            throw new RuntimeException("Manager and User ids are the same");
        }
        noteEntity.setManager(managerEntity);
        noteEntity.setUser(userEntity);
        noteRepository.save(noteEntity);
    }
}
