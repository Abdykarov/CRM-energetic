package com.example.demo.domain;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "potential_client")
public class PotentialClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String surname;
    String phone;
    String email;
    @Enumerated(EnumType.ORDINAL)
    PotentialClientStatus potentialClientStatus;
    String city;
    String psc;
    Long salesmanId;
    String companyName;
    String positionName;
    boolean B2B;
    boolean generatedSuperContract;
    boolean sendedSuperContract;
    boolean signedSuperContract;
}
