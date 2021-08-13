package com.example.demo.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class EmailRequestDto {
    private String from;
    private String target;
    private String subject;
    private String text;
}
