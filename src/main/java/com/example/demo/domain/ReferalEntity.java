package com.example.demo.domain;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
public class ReferalEntity extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private String referalLink;
    @ManyToOne
    @JoinColumn(name = "link_creator_id")
    private UserEntity linkCreator;
}
