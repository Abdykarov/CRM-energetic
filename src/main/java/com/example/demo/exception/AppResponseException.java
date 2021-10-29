package com.example.demo.exception;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppResponseException {
    final String message;
    final HttpStatus httpStatus;
    final String throwableException;
    final ZonedDateTime zonedDateTime;
}