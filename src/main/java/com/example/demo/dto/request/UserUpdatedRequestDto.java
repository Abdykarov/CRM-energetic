package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.sql.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdatedRequestDto {

    Long userId;
    Long editorId;
    String name;
    String surname;
    String phone;
    String email;
    String ico;

}
