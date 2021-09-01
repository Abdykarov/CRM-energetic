package com.example.demo.dto;

import com.example.demo.domain.RoleEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Accessors(chain = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PotentialResponseDto {
    Long id;
    String name;
    String surname;
    String phone;
    String email;
    Set<RoleEntity> roles;
    String city;
    String jobPosition;
    String ico;
    String companyName;
    Long salesmanId;
    String B2B;
    boolean generatedContract;
    boolean sendedContract;
    boolean signedContract;

    boolean HWSunMonitor;
    boolean SyselAgreement;
    boolean connectedFVE;
}
