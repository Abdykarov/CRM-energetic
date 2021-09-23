package com.example.demo.dto.response;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicantResponseDto {

    Long id;
    String opNumber;
    String name;
    String surname;
    String phone;
    String email;
    String city;
    String ico;
    String area;
    Long salesmanId;
    Long referalId;
    Long campaign;
    Set<RoleEntity> roles;

    boolean hwsunMonitorGenerated;
    boolean hwsunMonitorSent;
    boolean hwsunMonitorSigned;
    boolean syselAgreementGenerated;
    boolean syselAgreementSent;
    boolean syselAgreementSigned;
    boolean requestToEdrGenerated;
    boolean requestToEdrSigned;
    boolean requestToEdrAccepted;
    boolean concurrentFveInstalled;
    boolean concurrentFveName;
    boolean concurrentFveDueDate;
    boolean connectedFveGenerated;
    boolean connectedFveSent;
    boolean connectedFveSigned;
    boolean edrContractGenerated;
    boolean edrContractSigned;
    boolean factureGenerated;
    boolean factureSent;
    boolean facturePaid;
    boolean confirmationAboutPaymentSent;

}
