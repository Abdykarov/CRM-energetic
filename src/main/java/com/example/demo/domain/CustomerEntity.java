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
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "customerId")
    private Long customerId;

    private String name;
    private String surname;
    private String phone;
    private String email;

    @Enumerated(EnumType.ORDINAL)
    private CustomerState customerState;

    // LEAD
    private String B2B;

    // POTENTIAL
    private boolean generatedContract;
    private boolean sendedContract;
    private boolean signedContract;


}
