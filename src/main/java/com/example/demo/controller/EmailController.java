package com.example.demo.controller;

import com.example.demo.dto.EmailRequestDto;
import com.example.demo.dto.EmailResponseDto;
import com.example.demo.service.imp.EmailServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/edr_api/email/")
public class EmailController {

    private final EmailServiceImpl emailService;

    @GetMapping
    public List<EmailResponseDto> getEmails(){
        return emailService.getEmails();
    }


    @GetMapping("{emailId}")
    public EmailResponseDto getEmail(@PathVariable Long emailId){
        return emailService.getEmail(emailId);
    }

    @PostMapping
    public EmailResponseDto sendEmail(@RequestBody EmailRequestDto emailRequestDto){
        return emailService.sendEmail(emailRequestDto);
    }


}
