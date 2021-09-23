package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class ConcurrentFveEntity extends DateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date dueTo;
    @OneToOne
    private UserEntity user;
}
