package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.Set;

@Data
@Accessors(chain = true)
public class SalesmanResponseDto {

    private Long id;
    private Set<RoleEntity> roles;
    private String name;
    private String surname;
    private String B2B;

}