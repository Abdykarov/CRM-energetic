package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class ReferalEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String referalLink;
    @ManyToOne
    @JoinColumn(name = "link_creator_id")
    private UserEntity linkCreator;
}
