//package com.example.demo.controller;
//
//import com.example.demo.dto.EdrRequestDto;
//import com.example.demo.dto.EdrResponseDto;
//import com.example.demo.service.imp.EdrServiceImp;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.bind.annotation.*;
//
//@AllArgsConstructor
//@RestController
//@Slf4j
//@RequestMapping("/edr_api/edr")
//@CrossOrigin(origins = "*", maxAge = 3600)
//public class EdrController {
//
//    private EdrServiceImp edrService;
//
//    @PostMapping("/registrate")
//    public EdrResponseDto registrateEdr(@RequestBody EdrRequestDto edrRequestDto){
//        return edrService.registrateEdr(edrRequestDto);
//    }
//
//
//}
