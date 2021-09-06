package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class FactureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne
    @JoinColumn(name = "userId")
    private UserEntity user;
    @CreatedDate
    private LocalDateTime createdAt;
    private String VarSymbol;
    @OneToMany(mappedBy = "facture",
            fetch = FetchType.EAGER,
            cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<FactureItemEntity> items;

    private BigDecimal totalPrice;
    @Enumerated(EnumType.STRING)
    private FactureStatus factureStatus;
}
