package com.example.demo.controller;

import com.example.demo.dto.request.CallCentrumRequestDto;
import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.CallCentrumResponseDto;
import com.example.demo.dto.response.EdrResponseDto;
import com.example.demo.service.imp.CallCentrumServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/call-centrum/")
public class CallCentrumController {

    private final AuthenticationManager authenticationManager;
    private final CallCentrumServiceImpl callCentrumService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping
    public List<CallCentrumResponseDto> findAll() {
        return callCentrumService.findAll();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @PostMapping
    public CallCentrumResponseDto createCallCentrum(@RequestBody CallCentrumRequestDto callCentrumRequestDto) {
        return callCentrumService.createCallCentrum(callCentrumRequestDto);
    }
}
