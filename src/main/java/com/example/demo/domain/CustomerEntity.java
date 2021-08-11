package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "customer")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String surname;
    private String phone;
    private String email;

    @Enumerated(EnumType.ORDINAL)
    private CustomerState customerState;

    // LEAD
    private boolean B2B;

    // POTENTIAL
    private boolean generatedContract;
    private boolean sendedContract;
    private boolean signedContract;
}
