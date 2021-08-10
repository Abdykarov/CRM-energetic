package com.example.demo.service;

import com.example.demo.dto.EdrMemberDto;

import java.util.List;

public interface EdrMemberService {

    List<EdrMemberDto> findAll();

    EdrMemberDto findMember(Long id);

    EdrMemberDto saveMember(EdrMemberDto productRequestDto);

    EdrMemberDto updateMember(EdrMemberDto productRequestDto, Long id);

    String deleteMember(Long id);


}
