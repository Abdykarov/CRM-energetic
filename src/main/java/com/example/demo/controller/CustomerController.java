package com.example.demo.controller;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.service.imp.CustomerServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/customer")
public class CustomerController {

    private final CustomerServiceImpl customerService;

    @GetMapping("{customerId}")
    public CustomerResponseDto getCustomerById(@PathVariable("customerId") Long id){
        return customerService.getCustomerById(id);
    }

    @GetMapping
    public List<CustomerResponseDto> getAll(){
        return customerService.getAll();
    }

    @GetMapping("/name/{customerName}")
    public CustomerResponseDto getCustomerByName(@PathVariable("customerName") String name) {
        return customerService.getCustomerByName(name);
    }

    @PostMapping("/create")
    public CustomerResponseDto createCustomer(@RequestBody CustomerRequestDto customerRequestDto){
        return customerService.createCustomer(customerRequestDto);
    }

    @PutMapping("/update/{customerId}")
    public CustomerResponseDto updateCustomer(@RequestBody CustomerRequestDto customerRequestDto,
                                              @PathVariable Long customerId){
        return customerService.updateCustomer(customerRequestDto, customerId);
    }

    @GetMapping("/update/{customerId}/state/{stateName}")
    public CustomerResponseDto changeCustomerState(@PathVariable Long customerId,
                                                   @PathVariable String stateName){
        return customerService.changeCustomerState(customerId, stateName);
    }


    @DeleteMapping("/delete/{customerId}")
    public HttpStatus updateCustomer(@PathVariable Long customerId){
        return customerService.deleteCustomer(customerId);
    }



}
