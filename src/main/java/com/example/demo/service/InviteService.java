package com.example.demo.service;

import com.example.demo.dto.request.InviteRequestDto;
import com.example.demo.dto.response.InviteResponseDto;

import javax.mail.MessagingException;
import java.util.List;

public interface InviteService {

    List<InviteResponseDto> findAll();

    void deleteInvite(Long inviteId);

    void createInvite(Long userId);

    void activateInvite(InviteRequestDto inviteRequestDto);

    InviteResponseDto findByUser(Long userId);

    InviteResponseDto findByLink(String code);

    void sendInvite(Long userId) throws MessagingException;
}
