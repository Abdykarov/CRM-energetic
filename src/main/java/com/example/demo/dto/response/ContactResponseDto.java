package com.example.demo.dto.response;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContactResponseDto {
    Long id;
    String name;
    String surname;
    String phone;
    String email;
    Set<RoleEntity> roles;
    String city;
    String area;
    String ico;
    EdrResponseDto referal;
    boolean male;
    boolean concurrentFveInstalled;
    boolean concurrentFveName;
    LocalDateTime concurrentFveDueDate;
}
