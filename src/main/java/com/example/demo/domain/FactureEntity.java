package com.example.demo.domain;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "facture")
public class FactureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String clientName;
    String clientSurname;
    String clientPhone;
    String clientEmail;

    Date creationDate;
    Time creationTime;

    String variableSymbol;
    String item;
    Integer sumToPay;
    Integer discount;
    boolean generatedFacture;
    boolean paidFacture;
    boolean sendedConfirmationAboutPayment;
}