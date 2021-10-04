package com.example.demo.dto.response;

import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
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
public class LeadResponseDto {
    Long id;
    String name;
    String surname;
    String phone;
    String email;
    String contactPerson;
    Set<RoleEntity> roles;
    String city;
    String ico;
    AreaResponseDto area;
    SalesmanResponseDto salesman;
    LocalDateTime roleChangedDate;
    EdrResponseDto referal;
    boolean male;
    boolean connectedFveSigned;
    boolean edrContractGenerated;
    boolean edrContractSent;
    boolean edrContractSigned;
}
