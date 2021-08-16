package com.example.demo.domain;

import lombok.Data;

import javax.persistence.Entity;

@Entity
@Data
public class ManagerEntity extends UserEntity{

    private String login;
    private String password;

}
