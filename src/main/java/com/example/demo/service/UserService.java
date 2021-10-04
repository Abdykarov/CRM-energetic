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

    UserResponseDto changeToEdr(Long id);

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

    List<ApplicantResponseDto> getApplicants();

    void testData();

    void setFveSigned(Long id);

    void setContractGenerated(Long id);

    void setContractSent(Long id);

    void setContractSigned(Long id);

    UserResponseDto changeToApplicant(Long id);
}
