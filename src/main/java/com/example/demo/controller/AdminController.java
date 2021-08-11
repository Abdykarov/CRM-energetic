package com.example.demo.controller;

import com.example.demo.dto.AdminRequestDto;
import com.example.demo.dto.AdminResponseDto;
import com.example.demo.service.imp.AdminServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("edr_api/admin/")
@AllArgsConstructor
public class AdminController {
    private final AdminServiceImpl adminService;

    @GetMapping("{adminId}")
    public AdminResponseDto getAdminById(@PathVariable("adminId") Long id){
        return adminService.getAdminById(id);
    }

    @GetMapping("/name/{adminName}")
    public AdminResponseDto getAdminByName(@PathVariable("adminName") String name) {
        return adminService.getAdminByName(name);
    }

    @PostMapping("/create")
    public AdminResponseDto createAdmin(@RequestBody AdminRequestDto AdminRequestDto){
        return adminService.createAdmin(AdminRequestDto);
    }

    @PutMapping("/update/{adminId}")
    public AdminResponseDto updateAdmin(@RequestBody AdminRequestDto AdminRequestDto,
                                              @PathVariable Long adminId){
        return adminService.updateAdmin(AdminRequestDto, adminId);
    }

    @DeleteMapping("/delete/{adminId}")
    public HttpStatus updateAdmin(@PathVariable Long adminId){
        return adminService.deleteAdmin(adminId);
    }
}
