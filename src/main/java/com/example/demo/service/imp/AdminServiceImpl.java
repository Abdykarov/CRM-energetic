package com.example.demo.service.imp;

import com.example.demo.dto.AdminRequestDto;
import com.example.demo.dto.AdminResponseDto;
import com.example.demo.reminder.CustomReminder;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.AdminService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@AllArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {

    private final CustomReminder customReminder;
    private final CustomerRepository customerRepository;

    @Override
    public AdminResponseDto getAdminById(Long id) {
        return null;
    }

    @Override
    public AdminResponseDto getAdminByName(String name) {
        return null;
    }

    @Override
    public AdminResponseDto createAdmin(AdminRequestDto AdminRequestDto) {
        return null;
    }

    @Override
    public HttpStatus deleteAdmin(Long id) {
        return null;
    }

    @Override
    public AdminResponseDto updateAdmin(AdminRequestDto AdminRequestDto, Long id) {
        return null;
    }
}
