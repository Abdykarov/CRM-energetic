package com.example.demo.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class CommonExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status, WebRequest request) {
        log.error("Validation exception was occured");

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {

            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        ZonedDateTime date = ZonedDateTime.now(ZoneId.of("Europe/Prague"));
        errors.put("time", DateTimeFormatter.ofPattern("dd/MM/yyyy - hh:mm").format(date));
        errors.put("exceptionName", "ValidationException");
        errors.put("HttpStatus", String.valueOf(status.value()));

        log.debug("Validation errors {}", errors);

        return new ResponseEntity<Object>(errors, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(AppRequestException.class)
    public ResponseEntity<Object> handleAppException(AppRequestException e, ServletWebRequest webRequest) {
        log.error("An error ocurred while processing request " +
                webRequest.getRequest().getMethod() + " at " +
                webRequest.getRequest().getRequestURI(), e);

        return handleExceptionInternal(e, new AppResponseException(
                e.getMessage(),
                e.getHttpStatus(),
                e.getClass().getName(),
                ZonedDateTime.now(ZoneId.of("Europe/Prague"))
        ), new HttpHeaders(), e.getHttpStatus(), webRequest);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleAnyException(Exception ex, ServletWebRequest webRequest) {
        log.error("An error ocurred while processing request " +
                webRequest.getRequest().getMethod() + " at " +
                webRequest.getRequest().getRequestURI(), ex);

        AppResponseException appResponseException = new AppResponseException(
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR,
                ex.getClass().getName(),
                ZonedDateTime.now(ZoneId.of("Europe/Prague"))
        );

        return handleExceptionInternal(ex, appResponseException,
                new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, webRequest);
    }
}