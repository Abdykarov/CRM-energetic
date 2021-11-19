package com.example.demo.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CallCentrumResponseDto {
    private Long id;
    private String username;
    private String password;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private Long areaId;
    private String address;
    private String ico;
}
