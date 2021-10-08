package com.example.demo.dto.response;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicantResponseDto {

    Long id;
    String username;
    boolean male;
    String name;
    String surname;
    String phone;
    String email;
    String password;
    String ico;
    String contactPerson;

    AreaResponseDto area;
    SalesmanResponseDto salesman;
    EdrResponseDto referal;
    LocalDateTime roleChangedDate;
    Set<RoleEntity> roles;

    // HW
    boolean hwsunMonitorGenerated;
    boolean hwsunMonitorSent;
    boolean hwsunMonitorSigned;
    // SYSEL
    boolean syselAgreementGenerated;
    boolean syselAgreementSent;
    boolean syselAgreementSigned;
    // REQUEST TO EDR
    boolean requestToEdrGenerated;
    boolean requestToEdrSent;
    boolean requestToEdrSigned;
    boolean requestToEdrAccepted;
    // CONCURRENT FVE
    boolean concurrentFveInstalled;
    // FVE SOLID SUN
    boolean connectedFveGenerated;
    boolean connectedFveSent;
    boolean connectedFveSigned;

    // SUPER SMLOUVA
    boolean edrContractGenerated;
    boolean edrContractSent;
    boolean edrContractSigned;
    // FACTURE
    boolean factureGenerated;
    boolean factureSent;
    boolean facturePaid;
}
