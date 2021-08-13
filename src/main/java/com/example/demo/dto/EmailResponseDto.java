package com.example.demo.dto;

import lombok.Data;

@Data
public class EmailResponseDto {
    private Long emailId;
    private String from;
    private String target;
    private String subject;
    private String text;
}
