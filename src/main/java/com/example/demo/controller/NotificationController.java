package com.example.demo.controller;

import com.example.demo.dto.response.NotificationResponseDto;
import com.example.demo.service.imp.NotificationServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/edr_api/notifications")
public class NotificationController {

    private AuthenticationManager authenticationManager;
    private final NotificationServiceImpl notificationService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER',' ROLE_SALESMAN','ROLE_CC')")
    @GetMapping()
    public List<NotificationResponseDto> getAllNotifications(){
        return notificationService.getAllNotifications();
    }

}
