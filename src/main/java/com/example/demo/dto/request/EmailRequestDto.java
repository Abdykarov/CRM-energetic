package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailRequestDto {
    String emailFrom;
    String emailTo;
    String body;
    String subject;
    boolean inbox;
}
