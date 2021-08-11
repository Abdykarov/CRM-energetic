package com.example.demo.controller;

import com.example.demo.dto.CustomerRequestDto;
import com.example.demo.dto.CustomerResponseDto;
import com.example.demo.dto.WalletRequestDto;
import com.example.demo.dto.WalletResponseDto;
import com.example.demo.service.imp.CustomerServiceImpl;
import com.example.demo.service.imp.WalletServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/wallet")
public class WalletController {
    private final WalletServiceImpl customerService;

    @GetMapping("{walletId}")
    public WalletResponseDto getCustomerById(@PathVariable("walletId") Long walletId){
        return customerService.getWalletById(walletId);
    }

    @GetMapping("/name/{clientId}")
    public WalletResponseDto getWalletByClientId(@PathVariable("clientId") Long clientId) {
        return customerService.getWalletByClientId(clientId);
    }

    @PostMapping("/create")
    public WalletResponseDto createWallet(@RequestBody WalletRequestDto walletRequestDto){
        return customerService.createWallet(walletRequestDto);
    }

    @PutMapping("/update/{walletId}")
    public WalletResponseDto updateWallet(@RequestBody WalletRequestDto walletRequestDto,
                                              @PathVariable Long walletId){
        return customerService.updateWallet(walletRequestDto, walletId);
    }

    @DeleteMapping("/delete/{walletId}")
    public HttpStatus deleteWallet(@PathVariable Long walletId){
        return customerService.deleteWallet(walletId);
    }
}
