package com.example.demo.domain;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Data
@Accessors(chain = true)
public class SuperContractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long contractId;

    @OneToOne
    @JoinColumn(name = "customerId")
    private CustomerEntity customerEntity;

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
