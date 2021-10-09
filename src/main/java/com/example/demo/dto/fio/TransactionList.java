package com.example.demo.dto.fio;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TransactionList {
    List<TransactionResponseDto> transaction;
}
