package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class WalletResponse {

    private Long walletId;
    private Long userId;
    private String userName;
    private BigDecimal balance;
}