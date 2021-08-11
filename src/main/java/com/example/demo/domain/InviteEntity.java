package com.example.demo.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class InviteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;


}
