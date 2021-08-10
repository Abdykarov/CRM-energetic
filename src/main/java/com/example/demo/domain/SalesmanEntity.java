package com.example.demo.domain;


import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@Table(name = "salesman")
public class SalesmanEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String surname;
    String phone;
    String email;

    Integer contactClientsCount;
    Integer leadClientsCount;
    Integer potentialClientsCount;
    Integer createdWalletsCount;
    String area;
    boolean B2B;

}
