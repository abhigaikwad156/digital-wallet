package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

   @PostMapping("/register")
public ResponseEntity<UserResponse> register(
        @Valid @RequestBody RegisterRequest request) {

    User user = authService.register(request);

    UserResponse response = new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail()
    );

    return ResponseEntity.ok(response);
}

    @PostMapping("/login")
public ResponseEntity<UserResponse> login(
        @Valid @RequestBody LoginRequest request) {

    User user = authService.login(request);

    UserResponse response = new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail()
    );

    return ResponseEntity.ok(response);
}
}