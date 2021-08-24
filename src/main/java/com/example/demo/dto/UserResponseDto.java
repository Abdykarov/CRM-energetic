package com.example.demo.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Access;

@Data
@Accessors(chain = true)
public class UserResponseDto {
    private Long id;
    private String username;
    private String password;
}
