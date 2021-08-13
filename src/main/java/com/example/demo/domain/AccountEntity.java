package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "client_wallet")
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long walletId;

    @OneToOne
    @JoinColumn(name = "customer_id")
    CustomerEntity customerEntity;

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
