package com.example.demo.domain;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Data
@Accessors(chain = true)
public class SuperContractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long contractId;

}
