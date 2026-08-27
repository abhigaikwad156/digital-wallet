package com.example.demo.controller;

import com.example.demo.dto.WalletResponse;
import com.example.demo.service.WalletService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.AddMoneyRequest;

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
@PostMapping("/{userId}/add")
public ResponseEntity<WalletResponse> addMoney(
        @PathVariable Long userId,
        @RequestBody AddMoneyRequest request) {

    WalletResponse wallet = walletService.addMoney(
            userId,
            request.getAmount()
    );

    return ResponseEntity.ok(wallet);
}
}