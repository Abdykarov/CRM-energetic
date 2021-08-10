package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "contact_client")
public class ContactClientEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String surname;
    String phone;
    String email;
    @Enumerated(EnumType.ORDINAL)
    ContactClientStatus contactClientStatus;
    String city;
    String psc;
    Long salesmanId;
    String companyName;
    String positionName;
}
