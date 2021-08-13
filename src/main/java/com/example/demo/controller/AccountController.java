package com.example.demo.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/account")
public class AccountController {

//   private final AccountServiceImpl AccountService;
//
//   @GetMapping("{AccountId}")
//   public AccountResponseDto getAccountById(@PathVariable("AccountId") Long id){
//      return AccountService.getAccountById(id);
//   }
//
//   @GetMapping
//   public List<AccountResponseDto> getAll(){
//      return AccountService.getAll();
//   }
//
//   @GetMapping("/name/{AccountName}")
//   public AccountResponseDto getAccountByName(@PathVariable("AccountName") String name) {
//      return AccountService.getAccountByName(name);
//   }
//
//   @PostMapping("/create")
//   public AccountResponseDto createAccount(@RequestBody AccountRequestDto AccountRequestDto){
//      return AccountService.createAccount(AccountRequestDto);
//   }
//
//   @PutMapping("/update/{AccountId}")
//   public AccountResponseDto updateAccount(@RequestBody AccountRequestDto AccountRequestDto,
//                                             @PathVariable Long AccountId){
//      return AccountService.updateAccount(AccountRequestDto, AccountId);
//   }
//
//   @GetMapping("/update/{AccountId}/state/{stateName}")
//   public AccountResponseDto changeAccountState(@PathVariable Long AccountId,
//                                                  @PathVariable String stateName){
//      return AccountService.changeAccountState(AccountId, stateName);
//   }
//
//
//   @DeleteMapping("/delete/{AccountId}")
//   public HttpStatus updateAccount(@PathVariable Long AccountId){
//      return AccountService.deleteAccount(AccountId);
//   }

}
