package com.example.demo.service.imp;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.reminder.CustomReminder;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.CustomerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomReminder customReminder;
    private final CustomerRepository customerRepository;

    @Override
    public CustomerResponseDto getCustomerById(Long id) {
        return null;
    }

    @Override
    public CustomerResponseDto getCustomerByName(String name) {
        return null;
    }

    @Override
    public CustomerResponseDto createCustomer(CustomerRequestDto customerRequestDto) {
        return null;
    }

    @Override
    public HttpStatus deleteCustomer(Long id) {
        return null;
    }

    @Override
    public CustomerResponseDto updateCustomer(CustomerRequestDto customerRequestDto, Long id) {
        return null;
    }
}
