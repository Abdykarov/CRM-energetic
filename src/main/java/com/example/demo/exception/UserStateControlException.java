package com.example.demo.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class UserStateControlException extends AppRequestException{
    private final String message;
    private final HttpStatus httpStatus;

    public UserStateControlException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
        this.httpStatus = httpStatus;
        this.message = message;
    }
}
