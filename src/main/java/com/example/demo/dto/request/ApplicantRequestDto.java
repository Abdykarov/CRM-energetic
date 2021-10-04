package com.example.demo.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.sql.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApplicantRequestDto {

    String opNumber;
    String name;
    String surname;
    String phone;
    String email;
    String city;
    String ico;
    Long areaId;
    Long salesmanId;
    Long referalId;
    Long campaign;
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
    Date concurrentFveDueDate;
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
