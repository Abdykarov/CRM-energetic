package com.example.demo.dto;

import lombok.Data;

@Data
public class CustomerRequestDto {
    private String name;
    private String surname;
    private String phone;
    private String email;
    private String customerState;
}
