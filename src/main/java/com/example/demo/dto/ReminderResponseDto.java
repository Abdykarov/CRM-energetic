package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;


@Data
@AllArgsConstructor
public class ReminderResponseDto {
    Long id;
    String reminderType;
    String description;
    Date creationDate;
    Time creationTime;
}
