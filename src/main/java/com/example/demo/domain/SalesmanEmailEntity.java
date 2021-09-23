package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class SalesmanEmailEntity extends DateAudit{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long salesmanId;
    private Long contactId;
    private String emailFrom;
    private String emailTo;
    private String body;
    private String subject;

}
