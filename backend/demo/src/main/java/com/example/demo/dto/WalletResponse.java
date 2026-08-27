package com.example.demo.dto;

import java.math.BigDecimal;

public class WalletResponse {

    private Long walletId;
    private Long userId;
    private String userName;
    private BigDecimal balance;

    public WalletResponse() {
    }

    public WalletResponse(
            Long walletId,
            Long userId,
            String userName,
            BigDecimal balance) {

        this.walletId = walletId;
        this.userId = userId;
        this.userName = userName;
        this.balance = balance;
    }

    public Long getWalletId() {
        return walletId;
    }

    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }
}