package com.example.demo.service;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.UserRequestDto;
import com.example.demo.dto.UserResponseDto;

import java.util.List;

public interface UserService {
    UserResponseDto saveContact(UserRequestDto user);
//    UserResponseDto saveLead(UserRequestDto user);
//    UserResponseDto saveManager(UserRequestDto user);
//    UserResponseDto saveSalesman(UserRequestDto user);

    List<UserResponseDto> findAll();

    UserResponseDto findByEmail(String email);
}
