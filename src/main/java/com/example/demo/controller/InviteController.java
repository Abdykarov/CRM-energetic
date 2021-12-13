package com.example.demo.controller;

import com.example.demo.domain.InviteEntity;
import com.example.demo.dto.request.InviteRequestDto;
import com.example.demo.dto.response.FactureResponseDto;
import com.example.demo.dto.response.InviteResponseDto;
import com.example.demo.service.InviteService;
import com.example.demo.service.imp.InviteServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/invites")
public class InviteController {

    private AuthenticationManager authenticationManager;
    private final InviteService inviteService;


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping()
    public List<InviteResponseDto> findAll() {
        return inviteService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/get/{userId}")
    public InviteResponseDto findByUser(@PathVariable Long userId) {
        return inviteService.findByUser(userId);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/link/{code}")
    public InviteResponseDto findByLink(@PathVariable String code) {
        return inviteService.findByLink(code);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER')")
    @GetMapping("/delete/{inviteId}")
    public void deleteInvite(@PathVariable Long inviteId){
        inviteService.deleteInvite(inviteId);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/email/{userId}")
    public void sendInvite(@PathVariable Long userId) throws MessagingException {
        inviteService.sendInvite(userId);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("{userId}")
    public void createInvite(@PathVariable Long userId) {
         inviteService.createInvite(userId);
    }

    @PostMapping()
    public void activateInvite(@RequestBody InviteRequestDto inviteRequestDto) {
        inviteService.activateInvite(inviteRequestDto);
    }
}
