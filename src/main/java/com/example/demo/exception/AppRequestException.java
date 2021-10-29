package com.example.demo.exception;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AppRequestException extends RuntimeException {
    final String message;
    final HttpStatus httpStatus;
}
