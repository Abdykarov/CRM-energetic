package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class EdrResponseDto {
    Long id;
    String name;
    String surname;
    String phone;
    String email;
    Set<RoleEntity> roles;
    String city;
    String ico;
    Long referalId;
    Integer walletPoints;
}
