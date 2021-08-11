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
    // or USE CustomerEntity JOIN
    boolean B2B;
    String name;
    String surname;
    String phone;
    String email;
    Long salesmanId;
    String city;
    String psc;

    // WALLET ATRIBUTES
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
