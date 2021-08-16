package com.example.demo.domain;

import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class SalesmanEntity extends UserEntity{

    private String login;
    private String password;

}
