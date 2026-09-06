package com.example.demo.controller;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.service.AuthService;
import com.example.demo.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
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
    String token = jwtService.generateToken(user.getEmail());

    UserResponse response = new UserResponse(
            user.getId(),
            user.getName(),
            user.getEmail(),
            token
    );

    return ResponseEntity.ok(response);
}
}