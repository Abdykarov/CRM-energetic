package com.example.demo.controller;

import com.example.demo.domain.EmailEntity;
import com.example.demo.service.imp.MailServiceImp;
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
@RequestMapping("edr_api/mail/")
public class MailController {

    private final String HEADER_STRING = "Authorization";

    private final String TOKEN_PREFIX = "Bearer";

    private AuthenticationManager authenticationManager;

    private MailServiceImp mailService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("inbox")
    public List<EmailEntity> getInbox() throws Exception {
        return mailService.getInbox();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER', 'ROLE_SALESMAN')")
    @GetMapping("{contactId}/communication")
    public List<EmailEntity> getCommunication(@PathVariable Long contactId){
        return mailService.getCommunication(contactId);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("fetch/inbox")
    public List<EmailEntity> fetchAllInbox() throws Exception {
        return mailService.fetchAllInbox();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("fetch/outbox")
    public List<EmailEntity> fetchAllOutbox() throws Exception {
        return mailService.fetchAllOutbox();
    }
}
