package com.example.demo.domain;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class EmailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String emailFrom;
    private String emailTo;
    @Column(columnDefinition="text")
    private String body;
    private String subject;
    private Date emailDate;
    private boolean inbox;
}
