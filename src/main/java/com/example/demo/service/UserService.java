package com.example.demo.service;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.*;

import java.util.List;

public interface UserService {
    AccountResponseDto saveAdmin(AuthRequestDto user);
    AccountResponseDto saveManager(AuthRequestDto user);
    SalesmanResponseDto saveSalesman(SalesmanRequestDto user);
    ContactResponseDto saveContact(ContactRequestDto user);

    List<ContactResponseDto> getContacts();

    List<ContactResponseDto> getSalesmanContacts(Long salesmanId);

    ContactResponseDto getContact(Long contactId);

    AccountResponseDto getAccountByUsername(String username);

    UserResponseDto findById(Long userId);
}
