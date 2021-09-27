package com.example.demo.dto.request;

import com.example.demo.domain.UserEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.OneToOne;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NoteRequestDto {
    String message;
    Long userId;
    Long managerId;
}
