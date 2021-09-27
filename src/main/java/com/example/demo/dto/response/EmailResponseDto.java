package com.example.demo.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailResponseDto {
    Long id;
    String emailFrom;
    String emailTo;
    String body;
    String subject;
    boolean inbox;
}
