package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.imp.UserServiceImp;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@AllArgsConstructor
@RestController
@Slf4j
@RequestMapping("/edr_api/user")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

    private final String HEADER_STRING = "Authorization";

    private final String TOKEN_PREFIX = "Bearer";

    private AuthenticationManager authenticationManager;

    private TokenProvider tokenProvider;

    private UserServiceImp userService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value="/userping", method = RequestMethod.GET)
    public String userPing(){
        return "Any User Can Read This";
    }

    
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value="/adminping", method = RequestMethod.GET)
    public String adminPing(){
        return "Any Admin Can Read This";
    }

    @GetMapping("/refresh/")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {

        String header = request.getHeader(HEADER_STRING);
        String username = null;
        String authToken = null;
        String token = null;
        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            authToken = header.replace(TOKEN_PREFIX,"");
            try {
                username = tokenProvider.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                log.error("An error occurred while fetching Username from Token", e);
            } catch (ExpiredJwtException e) {
                log.warn("The token has expired", e);
            } catch(SignatureException e){
                log.error("Authentication Failed. Username or Password not valid.");
            }
        } else {
            log.warn("Couldn't find bearer string, header will be ignored");
        }
        if (username != null) {

            UserDetails userDetails = userService.loadUserByUsername(username);

            if (tokenProvider.validateToken(authToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = tokenProvider.getAuthenticationToken(authToken, SecurityContextHolder.getContext().getAuthentication(), userDetails);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                log.info("authenticated user " + username + ", setting security context");
                token = tokenProvider.generateToken(authentication);
            }
        }
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping("/login/")
    public ResponseEntity<?> generateToken(@RequestBody AuthRequestDto loginUser) throws AuthenticationException {

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

    @PostMapping("/admin/")
    public AccountResponseDto createAdmin(@RequestBody AuthRequestDto authRequestDto){
        return userService.saveAdmin(authRequestDto);
    }

    @PostMapping("/manager/")
    public AccountResponseDto createManager(@RequestBody AuthRequestDto authRequestDto){
        return userService.saveManager(authRequestDto);
    }

}
