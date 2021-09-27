package com.example.demo.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NoteResponseDto {
    Long id;
    String message;
    Date createdAt;
    ManagerResponseDto manager;
}
