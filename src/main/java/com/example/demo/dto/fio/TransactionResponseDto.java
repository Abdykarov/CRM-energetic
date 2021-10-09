package com.example.demo.dto.fio;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionResponseDto {
    TransactionId column22;
    TransactionDate column0;
    TransactionValue column1;
    TransactionVariableSymbol column5;
}
