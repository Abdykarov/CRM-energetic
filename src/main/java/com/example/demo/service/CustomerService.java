package com.example.demo.service;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface CustomerService {

    List<CustomerResponseDto> getAll();

    CustomerResponseDto getCustomerById(Long id);

    CustomerResponseDto getCustomerByName(String name);

    CustomerResponseDto createCustomer(CustomerRequestDto customerRequestDto);

    HttpStatus deleteCustomer(Long id);

    CustomerResponseDto updateCustomer(CustomerRequestDto customerRequestDto, Long id);

    CustomerResponseDto changeCustomerState(Long id, String state);
}
