package com.example.demo.dto.response;

import lombok.Data;

@Data
public class SalesmanResponseDto {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private AreaResponseDto area;
    private String ico;
}
