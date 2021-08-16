package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Accessors(chain = true)
@Table(name = "customer")
public class CustomerEntity extends UserEntity{

    @Enumerated(EnumType.ORDINAL)
    CustomerState customerState;

    // LEAD
    String B2B;

    // POTENTIAL
    boolean generatedContract;
    boolean sendedContract;
    boolean signedContract;

    // APPLIED ATRIBUTES
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
