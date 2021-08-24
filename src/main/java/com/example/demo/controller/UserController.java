package com.example.demo.controller;

import com.example.demo.dto.AuthToken;
import com.example.demo.dto.UserRequestDto;
import com.example.demo.dto.UserResponseDto;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.imp.UserServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/edr_api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private AuthenticationManager authenticationManager;

    private TokenProvider tokenProvider;

    private UserServiceImp userService;

    @PostMapping("/authenticate/")
    public ResponseEntity<?> generateToken(@RequestBody UserRequestDto loginUser) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping("/contact/register/")
    public UserResponseDto createContact(@RequestBody UserRequestDto userRequestDto){
        return userService.saveContact(userRequestDto);
    }

    @PostMapping("/test/")
    public UserResponseDto test(@RequestBody UserRequestDto userRequestDto){
        return new UserResponseDto()
                .setUsername(userRequestDto.getUsername())
                .setPassword(userRequestDto.getPassword());
    }
}
