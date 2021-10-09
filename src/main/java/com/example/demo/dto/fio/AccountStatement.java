package com.example.demo.dto.fio;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccountStatement {
    TransactionList transactionList;
}
