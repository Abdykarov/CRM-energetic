package com.example.demo.dto.request;

import com.example.demo.domain.CampaignEntity;
import com.example.demo.domain.RoleEntity;
import com.example.demo.domain.UserEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.sql.Date;
import java.util.Set;

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
    String area;
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
