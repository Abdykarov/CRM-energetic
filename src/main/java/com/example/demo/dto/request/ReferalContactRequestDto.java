package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.validation.constraints.NotBlank;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReferalContactRequestDto {
    @NotBlank
    String name;
    @NotBlank
    String surname;
    String phone;
    @NotBlank
    String email;
    Long salesmanId;
    String jobPosition;
    String ico;
    String companyName;
    String city;
}
