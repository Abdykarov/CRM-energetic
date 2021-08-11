package com.example.demo.service;

import com.example.demo.dto.AdminRequestDto;
import com.example.demo.dto.AdminResponseDto;
import org.springframework.http.HttpStatus;

public interface AdminService {
    AdminResponseDto getAdminById(Long id);

    AdminResponseDto getAdminByName(String name);

    AdminResponseDto createAdmin(AdminRequestDto AdminRequestDto);

    HttpStatus deleteAdmin(Long id);

    AdminResponseDto updateAdmin(AdminRequestDto AdminRequestDto, Long id);

}
