package com.example.demo.dto.response;

import com.example.demo.domain.FactureStatus;
import com.example.demo.domain.UserEntity;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FactureResponseDto {
    Long id;
    UserResponseDto user;
    LocalDate createdAt;
    LocalDate dueDate;
    String varSymbol;
    BigDecimal totalPrice;
    String factureStatus;
}
