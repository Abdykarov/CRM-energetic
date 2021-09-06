package com.example.demo.service;

import com.example.demo.domain.UserEntity;
import com.example.demo.dto.*;

import java.util.List;

public interface UserService {
    AccountResponseDto saveAdmin(AuthRequestDto user);

    AccountResponseDto saveManager(AuthRequestDto user);

    SalesmanResponseDto saveSalesman(SalesmanRequestDto user);

    ContactResponseDto saveContact(ContactRequestDto user);

    List<ContactResponseDto> getContacts();

    List<ContactResponseDto> getSalesmanContacts(Long salesmanId);

    ContactResponseDto getContact(Long contactId);

    AccountResponseDto getAccountByUsername(String username);

    UserResponseDto findById(Long userId);

    List<LeadResponseDto> getLeads();

    UserResponseDto changeToLead(Long userId);

    UserResponseDto changeToPotential(Long userId);

    UserResponseDto changeToCurrent(Long userId);

    UserResponseDto changeToAccepted(Long userId);

    UserResponseDto changeToEdr(Long id);

    void setSignContract(boolean value, Long userId);

    List<PotentialResponseDto> getPotentials();

    List<CurrentResponseDto> getCurrents();

    List<AcceptedResponseDto> getAccepted();

    List<EdrResponseDto> getEdr();

    void setConnectedFve(boolean b, Long userId);

    void setSyselAgreement(boolean b, Long userId);

    void setHwSunMonitor(boolean b, Long userId);

    void setSignedRequest(boolean b, Long userId);

}
