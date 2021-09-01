package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;

@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContactRequestDto {
    @NotBlank
    String name;
    @NotBlank
    String surname;
    String phone;
    @NotBlank
    String email;
    Long salesmanId;
    String company;
    String position;
    String city;
    String ico;

}
