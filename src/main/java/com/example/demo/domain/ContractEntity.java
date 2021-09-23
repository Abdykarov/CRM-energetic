package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class ContractEntity extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String contractType;
    @ManyToOne
    @JoinColumn(name = "lead_id")
    private UserEntity lead;
}
