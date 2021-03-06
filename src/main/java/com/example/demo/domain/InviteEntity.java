package com.example.demo.domain;

import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class InviteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
    @Enumerated(EnumType.STRING)
    private InviteStatus inviteStatus;
    private LocalDate createdAt;
    private String uniqueCode;
    private String name;
    private String surname;
    private String titul;
    private String firmName;
    private String firmLeader;
    private String street;
    private String area;
    private String psc;
    private String rc;
    private String ico;
    private String dic;
    private String phone;
    private String email;
    private String fveStreet1;
    private String fveArea1;
    private String fvePsc1;
    private String fveStreet2;
    private String fveArea2;
    private String fvePsc2;
    private String fveStreet3;
    private String fveArea3;
    private String fvePsc3;
    private String fveStreet4;
    private String fveArea4;
    private String fvePsc4;
    private String fveCapacity;
    private String batteryCapacity;
}
