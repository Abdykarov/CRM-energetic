package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String username;
    boolean male;
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
    LocalDateTime roleChangedDate;

    @ManyToMany(fetch = FetchType.EAGER)
    Set<RoleEntity> roles;

    // HW
    boolean hwsunMonitorGenerated;
    boolean hwsunMonitorSent;
    boolean hwsunMonitorSigned;
    LocalDateTime hwsunMonitorGeneratedDate;
    LocalDateTime hwsunMonitorSentDate;
    LocalDateTime hwsunMonitorSignedDate;

    // SYSEL
    boolean syselAgreementGenerated;
    boolean syselAgreementSent;
    boolean syselAgreementSigned;
    LocalDateTime syselAgreementGeneratedDate;
    LocalDateTime syselAgreementSentDate;
    LocalDateTime syselAgreementSignedDate;

    // REQUEST TO EDR
    boolean requestToEdrGenerated;
    boolean requestToEdrSigned;
    boolean requestToEdrAccepted;
    LocalDateTime requestToEdrGeneratedDate;
    LocalDateTime requestToEdrSignedDate;
    LocalDateTime requestToEdrAcceptedDate;

    // CONCURRENT FVE
    boolean concurrentFveInstalled;
    String concurrentFveName;
    LocalDateTime concurrentFveDueDate;

    // FVE SOLID SUN
    boolean connectedFveGenerated;
    boolean connectedFveSent;
    boolean connectedFveSigned;
    LocalDateTime connectedFveGeneratedDate;
    LocalDateTime connectedFveSentDate;
    LocalDateTime connectedFveSignedDate;

    // SUPER SMLOUVA
    boolean edrContractGenerated;
    boolean edrContractSent;
    boolean edrContractSigned;
    LocalDateTime edrContractGeneratedDate;
    LocalDateTime edrContractSentDate;
    LocalDateTime edrContractSignedDate;

    // FACTURE
    boolean factureGenerated;
    boolean factureSent;
    boolean facturePaid;
    LocalDateTime factureGeneratedDate;
    LocalDateTime factureSentDate;
    LocalDateTime facturePaidDate;
}
