package com.example.demo.controller;

import com.example.demo.dto.request.EdrRequestDto;
import com.example.demo.dto.response.EdrResponseDto;
import com.example.demo.service.imp.EdrServiceImp;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

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

    @GetMapping("/export/csv")
    public ResponseEntity<Resource> getContactsCsv() {
        String filename = "edr.csv";
        InputStreamResource file = edrService.getLeadCsv();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/csv"))
                .body(file);
    }

    @RequestMapping(value = "/import/csv", method = RequestMethod.POST)
    public ResponseEntity<HttpStatus> importCsv(@RequestParam("file") MultipartFile file) throws IOException {
        edrService.importCsv(file, null);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER', 'ROLE_SALESMAN', 'ROLE_CC')")
    @GetMapping("/findAll")
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            final Map<String, Object> response = edrService.findAll(page, size);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER', 'ROLE_SALESMAN', 'ROLE_CC')")
    @GetMapping("/filter")
    public ResponseEntity<Map<String, Object>> queryFilter(
            @RequestParam(required = true) String filterType,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            final Map<String, Object> response = edrService.queryFilter(filterType, name, surname, page, size);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
