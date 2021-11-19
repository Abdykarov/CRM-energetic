package com.example.demo.service;

import com.example.demo.domain.NotificationDescType;
import com.example.demo.dto.response.NotificationResponseDto;

import java.util.List;

public interface NotificationService {
    List<NotificationResponseDto> getAllNotifications();

    void createNotification(Long activeUser, Long passiveUser, String text, NotificationDescType notificationDescType);
}
