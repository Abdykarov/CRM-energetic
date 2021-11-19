package com.example.demo.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponseDto {
    Long id;
    UserResponseDto activeUser;
    UserResponseDto passiveUser;
    String text;
    String notificationDescType;
    LocalDateTime createdAt;
}
