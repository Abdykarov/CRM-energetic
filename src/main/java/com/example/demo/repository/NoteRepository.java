package com.example.demo.repository;

import com.example.demo.domain.NoteEntity;
import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.NoteResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<NoteEntity, Long> {
    List<NoteEntity> findAllByUser_Id(Long contactId);

    List<NoteEntity> findAllByUser(UserEntity user);
}
