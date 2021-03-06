package com.example.demo.dto.request;

import lombok.Data;

@Data
public class SalesmanRequestDto {
    private String username;
    private String password;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private Long areaId;
    private String ico;
}
