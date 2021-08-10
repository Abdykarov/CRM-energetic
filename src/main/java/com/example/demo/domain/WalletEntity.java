package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "client_wallet")
public class WalletEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String surname;
    String phone;
    String email;

    @Enumerated(EnumType.ORDINAL)
    WalletClientStatus walletClientStatus;
    Long salesmanId;
    String city;
    String psc;
    boolean B2B;
    boolean generatedRequestToEdr;
    boolean paidRequestToEdr;
    boolean acceptedRequestToEdr;
    boolean generatedFacture;
    boolean paidFacture;
    boolean sendedConfirmationAboutPayment;
    boolean HWSunMonitor;
    boolean SyselAgreement;
    boolean connectedFVE;

}
