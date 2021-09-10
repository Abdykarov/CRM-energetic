package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
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
    String name;
    String surname;
    String phone;
    String email;
    String password;
    String city;
    String jobPosition;
    String ico;
    String companyName;
    String area;
    Long salesmanId;
    @Column(name = "referal_id")
    Long referalId;

    @Column(name = "wallet_points")
    Integer walletPoints;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleId")
    Set<RoleEntity> roles;

    // LEAD
    String B2B;

    // POTENTIAL
    boolean generatedContract;
    boolean signedContract;

    // APPLIED ATRIBUTES
    boolean generatedRequestToEdr;
    boolean signedRequestToEdr;
    boolean acceptedRequestToEdr;

    boolean generatedFacture;
    boolean paidFacture;
    boolean sendedConfirmationAboutPayment;

    boolean HWSunMonitor;
    boolean SyselAgreement;
    boolean connectedFVE;

}
