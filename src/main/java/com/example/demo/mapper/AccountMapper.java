package com.example.demo.mapper;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.response.AccountResponseDto;
import org.mapstruct.Mapper;

@Mapper
public interface AccountMapper {

    AccountResponseDto toResponse(UserEntity user);

}
