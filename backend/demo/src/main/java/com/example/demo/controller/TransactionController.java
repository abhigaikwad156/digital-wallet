package com.example.demo.controller;

import com.example.demo.dto.SendMoneyRequest;
import com.example.demo.entity.Transaction;
import com.example.demo.service.TransactionService;
import com.example.demo.dto.TransactionResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/send")
    public ResponseEntity<Transaction> sendMoney(
            @RequestBody SendMoneyRequest request) {

        Transaction transaction =
                transactionService.sendMoney(request);

        return ResponseEntity.ok(transaction);
    }
@GetMapping("/user/{userId}")
public ResponseEntity<List<TransactionResponse>> getUserTransactions(
        @PathVariable Long userId) {

    List<TransactionResponse> transactions =
            transactionService.getUserTransactions(userId);

    return ResponseEntity.ok(transactions);
}
}