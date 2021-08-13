package com.example.demo.service;

import com.example.demo.dto.EmailRequestDto;
import com.example.demo.dto.EmailResponseDto;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.List;

public interface EmailService {

    List<EmailResponseDto> getEmails();
    EmailResponseDto getEmail(Long emailId);
    EmailResponseDto sendEmail(EmailRequestDto emailRequestDto);

}
