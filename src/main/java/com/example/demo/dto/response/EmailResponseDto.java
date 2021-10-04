package com.example.demo.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.Column;
import java.util.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EmailResponseDto {
    Long id;
    String emailFrom;
    String emailTo;
    String body;
    String subject;
    Date emailDate;
    boolean inbox;
}
