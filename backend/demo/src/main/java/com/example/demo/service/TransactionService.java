package com.example.demo.service;

import com.example.demo.dto.SendMoneyRequest;
import com.example.demo.entity.Transaction;
import com.example.demo.entity.User;
import com.example.demo.entity.Wallet;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WalletRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.math.BigDecimal;
import com.example.demo.dto.TransactionResponse;

@Service
public class TransactionService {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(
            UserRepository userRepository,
            WalletRepository walletRepository,
            TransactionRepository transactionRepository) {

        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public Transaction sendMoney(SendMoneyRequest request) {

        User sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() ->
                        new RuntimeException("Sender not found"));

        User receiver = userRepository.findByEmail(request.getReceiverEmail())
        .orElseThrow(() ->
                new RuntimeException("No user found with this email"));

        if (request.getAmount() == null ||
                request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            throw new RuntimeException("Amount must be greater than zero");
        }

        if (sender.getId().equals(receiver.getId())) {
    throw new RuntimeException("Cannot send money to yourself");
}

        Wallet senderWallet = walletRepository
                .findByUserId(sender.getId())
                .orElseThrow(() ->
                        new RuntimeException("Sender wallet not found"));

        Wallet receiverWallet = walletRepository
                .findByUserId(receiver.getId())
                .orElseThrow(() ->
                        new RuntimeException("Receiver wallet not found"));

        if (senderWallet.getBalance()
                .compareTo(request.getAmount()) < 0) {

            throw new RuntimeException("Insufficient balance");
        }

        senderWallet.setBalance(
                senderWallet.getBalance()
                        .subtract(request.getAmount())
        );

        receiverWallet.setBalance(
                receiverWallet.getBalance()
                        .add(request.getAmount())
        );

        walletRepository.save(senderWallet);
        walletRepository.save(receiverWallet);

        Transaction transaction = new Transaction(
                sender,
                receiver,
                request.getAmount()
        );

        return transactionRepository.save(transaction);
    }
   public List<TransactionResponse> getUserTransactions(Long userId) {

    List<Transaction> transactions =
            transactionRepository.findBySenderIdOrReceiverId(userId, userId);

    return transactions.stream()
            .map(transaction -> new TransactionResponse(
                    transaction.getId(),
                    transaction.getSender().getId(),
                    transaction.getSender().getName(),
                    transaction.getReceiver().getId(),
                    transaction.getReceiver().getName(),
                    transaction.getAmount(),
                    transaction.getCreatedAt()
            ))
            .toList();
}
}