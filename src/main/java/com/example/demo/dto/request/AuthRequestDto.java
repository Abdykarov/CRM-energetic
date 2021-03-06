package com.example.demo.dto.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AuthRequestDto {

    private String username;
    private String password;
}
