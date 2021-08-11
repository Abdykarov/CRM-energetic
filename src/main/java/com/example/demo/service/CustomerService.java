package com.example.demo.service;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import org.springframework.http.HttpStatus;

public interface CustomerService {
    CustomerResponseDto getCustomerById(Long id);

    CustomerResponseDto getCustomerByName(String name);

    CustomerResponseDto createCustomer(CustomerRequestDto customerRequestDto);

    HttpStatus deleteCustomer(Long id);

    CustomerResponseDto updateCustomer(CustomerRequestDto customerRequestDto, Long id);

}
