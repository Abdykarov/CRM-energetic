package com.example.demo.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class CustomerResponseDto {
    private Long customerId;

    private String name;
    private String surname;
    private String phone;
    private String email;
    private String customerState;

    //LEAD
    private String B2B;

    // POTENTIAL
    private boolean generatedContract;
    private boolean sendedContract;
    private boolean signedContract;
}
