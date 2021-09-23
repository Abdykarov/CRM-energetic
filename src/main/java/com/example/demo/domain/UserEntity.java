package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.sql.Date;
import java.util.Set;

@Entity
@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String opNumber;
    String username;
    String name;
    String surname;
    String phone;
    String email;
    String password;
    String city;
    String ico;
    String area;
    @ManyToOne
    @JoinColumn(name = "salesman_id")
    UserEntity salesman;
    @ManyToOne
    @JoinColumn(name = "referal_id")
    UserEntity referal;
    Integer walletPoints;
    Date acceptedAt;
    @ManyToOne
    @JoinColumn(name = "campaign_id")
    CampaignEntity campaignId;

    @ManyToMany(fetch = FetchType.EAGER)
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
