package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.Access;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponseDto {
    Long id;
    String username;
    String name;
    String surname;
    String phone;
    String email;
    String password;
    RoleEntity role;
    String B2B;
    boolean generatedContract;
    boolean sendedContract;
    boolean signedContract;
    boolean generatedRequestToEdr;
    boolean paidRequestToEdr;
    boolean acceptedRequestToEdr;
    boolean generatedFacture;
    boolean paidFacture;
    boolean sendedConfirmationAboutPayment;
    boolean HWSunMonitor;
    boolean SyselAgreement;
    boolean connectedFVE;
}
