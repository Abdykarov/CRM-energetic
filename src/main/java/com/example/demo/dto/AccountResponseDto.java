package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Set;

@Data
@Accessors(chain = true)
public class AccountResponseDto {
    private Long id;
    private Set<RoleEntity> roles;
    private String username;
}
