package com.example.demo.domain;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
public class EdrLinkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "current_id")
    private UserEntity current;
    private String registrationLink;
}
