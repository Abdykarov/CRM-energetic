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
    String name;
    String surname;
    String phone;
    String email;
    String contactPerson;
    Set<RoleEntity> roles;
    String ico;
    AreaResponseDto area;
    SalesmanResponseDto salesman;
    LocalDateTime roleChangedDate;
    EdrResponseDto referal;
    boolean male;

    // HW
    boolean hwsunMonitorGenerated;
    boolean hwsunMonitorSent;
    boolean hwsunMonitorSigned;
    String hwsunMonitorStatus;
    // SYSEL
    boolean syselAgreementGenerated;
    boolean syselAgreementSent;
    boolean syselAgreementSigned;
    String syselAgreementStatus;
    // REQUEST TO EDR
    boolean requestToEdrGenerated;
    boolean requestToEdrSent;
    boolean requestToEdrSigned;
    boolean requestToEdrAccepted;
    String requestToEdrStatus;
    // CONCURRENT FVE
    boolean concurrentFveInstalled;
    // FVE SOLID SUN
    boolean connectedFveGenerated;
    boolean connectedFveSent;
    boolean connectedFveSigned;
    String connectedFveStatus;

    // FACTURE
    boolean factureGenerated;
    boolean factureSent;
    boolean facturePaid;
    String factureStatus;
}
