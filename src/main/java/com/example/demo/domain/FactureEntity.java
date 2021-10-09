package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class FactureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
    private LocalDate createdAt;
    private LocalDate dueDate;
    private String varSymbol;
    private BigDecimal totalPrice;
    @Enumerated(EnumType.STRING)
    private FactureStatus factureStatus;
}
