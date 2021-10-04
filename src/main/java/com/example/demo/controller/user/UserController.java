package com.example.demo.controller.user;

import com.example.demo.dto.request.ReferalContactRequestDto;
import com.example.demo.dto.request.*;
import com.example.demo.dto.response.*;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.imp.user.UserServiceImp;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/edr_api/user")
public class UserController {

    private final String HEADER_STRING = "Authorization";

    private final String TOKEN_PREFIX = "Bearer";

    private AuthenticationManager authenticationManager;

    private TokenProvider tokenProvider;

    private UserServiceImp userService;

    @GetMapping("/refresh/")
    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {

        String header = request.getHeader(HEADER_STRING);
        String username = null;
        String authToken = null;
        String token = null;
        if (header != null && header.startsWith(TOKEN_PREFIX)) {
            authToken = header.replace(TOKEN_PREFIX, "");
            try {
                username = tokenProvider.getUsernameFromToken(authToken);
            } catch (IllegalArgumentException e) {
                log.error("An error occurred while fetching Username from Token", e);
            } catch (ExpiredJwtException e) {
                log.warn("The token has expired", e);
            } catch (SignatureException e) {
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

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create/admin/")
    public AdminResponseDto createAdmin(@RequestBody AdminRequestDto adminRequestDto) {
        return userService.saveAdmin(adminRequestDto);
    }

    @PostMapping("/admin/")
    public void testData() {
        userService.testData();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create/manager/")
    public ManagerResponseDto createManager(@RequestBody ManagerRequestDto managerRequestDto) {
        return userService.saveManager(managerRequestDto);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @PostMapping("/create/salesman/")
    public SalesmanResponseDto createSalesman(@RequestBody SalesmanRequestDto salesmanRequestDto) {
        return userService.saveSalesman(salesmanRequestDto);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @PostMapping("/create/contact/")
    public ContactResponseDto createContact(@RequestBody ContactRequestDto contactRequestDto) {
        return userService.saveContact(contactRequestDto);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/count/admin")
    public Integer getAdminCount() {
        return userService.getAdminCount();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/count/manager")
    public Integer getManagerCount() {
        return userService.getManagerCount();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER', 'ROLE_SALESMAN')")
    @GetMapping("/count/salesman")
    public Integer getSalesmanCount() {
        return userService.getSalesmanCount();
    }


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/contact/admins")
    public List<AdminResponseDto> getAdmins() {
        return userService.getAdmins();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/contact/managers")
    public List<ManagerResponseDto> getManagers() {
        return userService.getManagers();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER', 'ROLE_SALESMAN')")
    @GetMapping("/contact/salesmans")
    public List<SalesmanResponseDto> getSalesmans() {
        return userService.getSalesmans();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN'   )")
    @GetMapping("/contact/contacts")
    public List<ContactResponseDto> getContacts() {
        return userService.getContacts();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/{salesmanId}/contacts/")
    public List<ContactResponseDto> getSalesmanContacts(@PathVariable Long salesmanId) {
        return userService.getSalesmanContacts(salesmanId);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/contact/leads")
    public List<LeadResponseDto> getLeads() {
        return userService.getLeads();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/contact/applicants/")
    public List<ApplicantResponseDto> getApplicants() {
        return userService.getApplicants();
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/contact/edr")
    public List<EdrResponseDto> getEdr() {
        return userService.getEdr();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER')")
    @GetMapping("/contact/{contactId}")
    public ContactResponseDto getContact(@PathVariable Long contactId) {
        return userService.getContact(contactId);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN','ROLE_EDR')")
    @GetMapping("/account/{username}")
    public AccountResponseDto getAccountByUsername(@PathVariable("username") String username) {
        return userService.getAccountByUsername(username);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN','ROLE_EDR')")
    @GetMapping("/{id}")
    public UserResponseDto getUser(@PathVariable("id") Long userId) {
        return userService.findById(userId);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/to_lead/{id}")
    public UserResponseDto changeToLead(@PathVariable Long id) {
        return userService.changeToLead(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/to_applicant/{id}")
    public UserResponseDto changeToApplicant(@PathVariable Long id) {
        return userService.changeToApplicant(id);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/to_edr/{id}")
    public UserResponseDto changeToEdr(@PathVariable Long id) {
        return userService.changeToEdr(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/fve-signed/{id}")
    public void setFveSigned(@PathVariable Long id) {
        userService.setFveSigned(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/contract-generated/{id}")
    public void setContractGenerated(@PathVariable Long id) {
        userService.setContractGenerated(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/contract-sent/{id}")
    public void setContractSent(@PathVariable Long id) {
        userService.setContractSent(id);
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER','ROLE_SALESMAN')")
    @GetMapping("/contract-signed/{id}")
    public void setContractSigned(@PathVariable Long id) {
        userService.setContractSigned(id);
    }


    @PostMapping("/create/referal-contact/")
    public ContactResponseDto createReferalContact(@RequestBody ReferalContactRequestDto referalContactRequestDto) {
        return userService.saveReferalContact(referalContactRequestDto);
    }



}
