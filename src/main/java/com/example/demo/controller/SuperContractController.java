package com.example.demo.controller;

import com.example.demo.dto.SuperContractRequestDto;
import com.example.demo.dto.SuperContractResponseDto;
import com.example.demo.service.imp.PdfService;
import com.example.demo.service.imp.SuperContractServiceImpl;
import com.lowagie.text.DocumentException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@AllArgsConstructor
@RequestMapping("/edr_api/user/")
public class SuperContractController {

    SuperContractServiceImpl superContractService;



    @GetMapping("/{id}/generate-supercontract")
    public void generateContract(@PathVariable("id") Long userId) throws IOException {
       superContractService.generateSuperContract(userId);
    }

}
