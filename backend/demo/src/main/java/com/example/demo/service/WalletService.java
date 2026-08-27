package com.example.demo.service;

import com.example.demo.dto.WalletResponse;
import com.example.demo.entity.Wallet;
import com.example.demo.repository.WalletRepository;


import java.math.BigDecimal;

import org.springframework.stereotype.Service;

@Service
public class WalletService {

    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public WalletResponse getWallet(Long userId) {

        Wallet wallet = walletRepository
                .findByUserId(userId)
                .orElseThrow(() ->
                        new RuntimeException("Wallet not found")
                );

        return new WalletResponse(
                wallet.getId(),
                wallet.getUser().getId(),
                wallet.getUser().getName(),
                wallet.getBalance()
        );
    }
    public WalletResponse addMoney(Long userId, BigDecimal amount) {

    Wallet wallet = walletRepository
            .findByUserId(userId)
            .orElseThrow(() ->
                    new RuntimeException("Wallet not found")
            );

    wallet.setBalance(
            wallet.getBalance().add(amount)
    );

    Wallet savedWallet = walletRepository.save(wallet);

    return new WalletResponse(
            savedWallet.getId(),
            savedWallet.getUser().getId(),
            savedWallet.getUser().getName(),
            savedWallet.getBalance()
    );
}
}