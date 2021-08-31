package com.example.demo.service;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.*;

import java.util.List;

public interface UserService {
    AccountResponseDto saveAdmin(AuthRequestDto user);
    AccountResponseDto saveManager(AuthRequestDto user);
    SalesmanRequestDto saveSalesman(SalesmanRequestDto user);
    UserResponseDto saveNewContact(SalesmanRequestDto user);

}
