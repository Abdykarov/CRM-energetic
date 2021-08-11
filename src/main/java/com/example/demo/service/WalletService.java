package com.example.demo.service;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.dto.WalletRequestDto;
import com.example.demo.dto.WalletResponseDto;
import org.springframework.http.HttpStatus;

public interface WalletService {

    WalletResponseDto getWalletById(Long walletId);

    WalletResponseDto getWalletByClientId(Long clientId);

    WalletResponseDto createWallet(WalletRequestDto walletRequestDto);

    HttpStatus deleteWallet(Long walletId);

    WalletResponseDto updateWallet(WalletRequestDto walletRequestDto, Long walletId);

}
