package com.example.demo.domain;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class ManagerEmailEntity extends DateAudit{
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
