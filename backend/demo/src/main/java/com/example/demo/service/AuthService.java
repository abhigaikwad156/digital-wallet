package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.entity.Wallet;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.WalletRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private UserRepository userRepository;
    private WalletRepository walletRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       WalletRepository walletRepository) {

        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User register(RegisterRequest request) {

        String password = passwordEncoder.encode(
                request.getPassword()
        );

        User user = new User(
                request.getName(),
                request.getEmail(),
                password
        );

        User savedUser = userRepository.save(user);

        Wallet wallet = new Wallet(savedUser);

        walletRepository.save(wallet);

        return savedUser;
    }

    public User login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }
}