package com.example.demo.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SalesmanRequestDto {

    private String username;
    private String password;
    private String name;
    private String surname;
    private String B2B;
}
