package com.example.demo.service.imp;

import com.example.demo.domain.CustomerEntity;
import com.example.demo.domain.CustomerState;
import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.mapper.CustomerMapper;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.CustomerService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerMapper customerMapper;
    private final CustomerRepository customerRepository;

    @Override
    public List<CustomerResponseDto> getAll() {
        List<CustomerEntity> entities = customerRepository.findAll();
        return entities.stream().map(p -> customerMapper.toResponse(p))
                .collect(Collectors.toList());
    }

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
        CustomerEntity save = customerRepository.save(customerMapper.toEntity(customerRequestDto));
        return customerMapper.toResponse(save);
    }

    @Override
    public HttpStatus deleteCustomer(Long id) {
        return null;
    }

    @Override
    public CustomerResponseDto updateCustomer(CustomerRequestDto customerRequestDto, Long id) {
        return null;
    }

    @Override
    @Transactional
    public CustomerResponseDto changeCustomerState(Long id, String state) {
        final CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("customer not found"));
        customer.setCustomerState((CustomerState)Enum.valueOf(CustomerState.class, state));
        CustomerEntity save = customerRepository.save(customer);
        return customerMapper.toResponse(save);
    }

}
