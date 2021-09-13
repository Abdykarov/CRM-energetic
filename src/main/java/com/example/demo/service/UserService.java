package com.example.demo.service;

import com.example.demo.dto.request.ReferalContactRequestDto;
import com.example.demo.dto.request.*;
import com.example.demo.dto.response.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface UserService {
    AdminResponseDto saveAdmin(AdminRequestDto adminRequestDto);

    ManagerResponseDto saveManager(ManagerRequestDto user);

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

    List<PotentialResponseDto> getPotentials();

    List<CurrentResponseDto> getCurrents();

    List<AcceptedResponseDto> getAccepted();

    List<EdrResponseDto> getEdr();

    List<AdminResponseDto> getAdmins();

    Integer getAdminCount();

    List<SalesmanResponseDto> getSalesmans();

    Integer getManagerCount();

    Integer getSalesmanCount();

    List<ManagerResponseDto> getManagers();

    ContactResponseDto saveReferalContact(ReferalContactRequestDto referalContactRequestDto);

    String createReferalLink(Long edrId);

    EdrResponseDto registrateEdr(@RequestBody EdrRequestDto edrRequestDto);

    String createRegistrationLink(Long currentId);

    EdrResponseDto saveEdr(EdrRequestDto edrRequestDto);
}
