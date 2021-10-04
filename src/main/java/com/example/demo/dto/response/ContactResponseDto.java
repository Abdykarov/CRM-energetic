package com.example.demo.dto.response;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
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
    String contactPerson;
    Set<RoleEntity> roles;
    LocalDateTime roleChangedDate;
    String city;
    AreaResponseDto area;
    String ico;
    EdrResponseDto referal;
    boolean male;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate concurrentFveDueDate;
    boolean concurrentFveInstalled;
    String concurrentFveName;
    boolean connectedFveSigned;
}
