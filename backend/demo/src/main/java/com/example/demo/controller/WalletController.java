package com.example.demo.controller;

import com.example.demo.dto.WalletResponse;
import com.example.demo.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "http://localhost:5173")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<WalletResponse> getWallet(
            @PathVariable Long userId) {

        WalletResponse wallet = walletService.getWallet(userId);

        return ResponseEntity.ok(wallet);
    }
}