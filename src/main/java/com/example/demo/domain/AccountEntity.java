package com.example.demo.domain;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "client_wallet")
public class AccountEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToOne
    @JoinColumn(name = "customer_id")
    CustomerEntity customerEntity;

    String login;
    String password;
}
