package com.example.demo.service.imp;

import com.example.demo.dto.WalletRequestDto;
import com.example.demo.dto.WalletResponseDto;
import com.example.demo.reminder.CustomReminder;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.WalletService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final CustomReminder customReminder;
    private final CustomerRepository customerRepository;

    @Override
    public WalletResponseDto getWalletById(Long walletId) {
        return null;
    }

    @Override
    public WalletResponseDto getWalletByClientId(Long clientId) {
        return null;
    }

    @Override
    public WalletResponseDto createWallet(WalletRequestDto walletRequestDto) {
        return null;
    }

    @Override
    public HttpStatus deleteWallet(Long walletId) {
        return null;
    }

    @Override
    public WalletResponseDto updateWallet(WalletRequestDto walletRequestDto, Long walletId) {
        return null;
    }
}
