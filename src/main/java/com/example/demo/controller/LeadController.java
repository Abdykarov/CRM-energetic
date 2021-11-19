package com.example.demo.controller;

import com.example.demo.dto.request.UserUpdatedRequestDto;
import com.example.demo.dto.response.ContactResponseDto;
import com.example.demo.dto.response.FactureResponseDto;
import com.example.demo.dto.response.UserResponseDto;
import com.example.demo.service.imp.ContactServiceImp;
import com.example.demo.service.imp.LeadServiceImp;
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
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@Slf4j
@CrossOrigin()
@RequestMapping("/api/v1/leads")
public class LeadController {

    private AuthenticationManager authenticationManager;
    private final LeadServiceImp leadServiceImp;

    @GetMapping("/export/csv")
    public ResponseEntity<Resource> getContactsCsv() {
        String filename = "contacts.csv";
        InputStreamResource file = leadServiceImp.getLeadCsv();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/csv"))
                .body(file);
    }

    @RequestMapping(value = "/import/csv", method = RequestMethod.POST)
    public ResponseEntity<HttpStatus> importCsv(@RequestParam("file") MultipartFile file) throws IOException {
        leadServiceImp.importCsv(file, null);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER', 'ROLE_SALESMAN', 'ROLE_CC')")
    @GetMapping("/findAll")
    public ResponseEntity<Map<String, Object>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        try {
            final Map<String, Object> response = leadServiceImp.findAll(page, size);
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
            final Map<String, Object> response = leadServiceImp.queryFilter(filterType, name, surname, page, size);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
