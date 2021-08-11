package com.example.demo.domain;

import javax.persistence.JoinColumn;

public class CustomerLeadEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer")
    private Address address;


}
