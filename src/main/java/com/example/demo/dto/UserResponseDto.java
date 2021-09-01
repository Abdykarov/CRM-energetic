package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.Set;

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
    String city;
    String jobPosition;
    String ico;
    String companyName;
    Long salesmanId;
    Set<RoleEntity> roles;
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
