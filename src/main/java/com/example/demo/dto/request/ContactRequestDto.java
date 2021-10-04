package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ContactRequestDto {
    @NotBlank
    String name;
    boolean male;
    @NotBlank
    String surname;
    String phone;
    @NotBlank
    String email;
    Long salesmanId;
    Long areaId;
    String ico;
    String contactPerson;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate concurrentFveDueDate;
    boolean concurrentFveInstalled;
    String concurrentFveName;
}
