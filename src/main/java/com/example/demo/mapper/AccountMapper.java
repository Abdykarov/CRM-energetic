package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.AccountResponseDto;
import com.example.demo.dto.UserRequestDto;
import com.example.demo.dto.UserResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AccountMapper {

    AccountResponseDto toResponse(UserEntity user);

}
