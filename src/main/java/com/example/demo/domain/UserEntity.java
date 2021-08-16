package com.example.demo.domain;

import javax.persistence.*;

@MappedSuperclass
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private String phone;
    private String email;

}
