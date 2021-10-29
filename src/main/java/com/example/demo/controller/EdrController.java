package com.example.demo.controller;

import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import com.example.demo.service.imp.EdrServiceImp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/edr_api/edr/")
public class EdrController {

    private AuthenticationManager authenticationManager;

    private EdrServiceImp edrService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/registration-link/{id}")
    public String createRegistrationLink(@PathVariable("id") Long currentId){
        return edrService.createRegistrationLink(currentId);
    }

    @PreAuthorize("hasRole('ROLE_EDR')")
    @GetMapping("/referal-link/{email}/{id}")
    public String createReferalLink(@PathVariable("email") String email, @PathVariable Long id){
        return edrService.createReferalLink(email, id);
    }

    @PostMapping("/registrate")
    public EdrResponseDto registrateEdr(@RequestBody EdrRequestDto edrRequestDto) {
        return edrService.registrateEdr(edrRequestDto);
    }

    @PostMapping("/edr-test/")
    public EdrResponseDto testEdr(@RequestBody EdrRequestDto edrRequestDto) {
        return edrService.saveEdr(edrRequestDto);
    }

}
