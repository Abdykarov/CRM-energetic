package com.example.demo.controller;

import com.example.demo.dto.EdrMemberDto;
import com.example.demo.service.imp.EdrMemberServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/edr_member")
public class EdrMemberController {

    private final EdrMemberServiceImpl edrMemberService;

    @GetMapping
    public List<EdrMemberDto> findAll() {
        return edrMemberService.findAll();
    }

    @GetMapping("{id}")
    public EdrMemberDto findProductById(@PathVariable("id") Long id) {
        return edrMemberService.findMember(id);
    }

    @PostMapping
    public EdrMemberDto saveProduct(@RequestBody EdrMemberDto productRequestDto) {
        return edrMemberService.saveMember(productRequestDto);
    }

    @PutMapping("{id}")
    public EdrMemberDto updateProduct(@RequestBody EdrMemberDto productRequestDto, @PathVariable("id") Long id) {
        return edrMemberService.updateMember(productRequestDto, id);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public String deleteProduct(@PathVariable("id") Long id) {
        return edrMemberService.deleteMember(id);
    }

}
