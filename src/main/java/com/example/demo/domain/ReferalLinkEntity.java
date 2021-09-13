package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class ReferalLinkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "edr_id")
    private UserEntity edr;
    private String referalLink;

}
