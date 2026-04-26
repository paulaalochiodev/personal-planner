package com.example.personalplanner.controller;

import com.example.personalplanner.dto.RegisterResponse;
import com.example.personalplanner.model.User;
import com.example.personalplanner.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

record LoginRequest(String username, String password) {}
record LoginResponse(String token) {}

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody User user) {
        User savedUser = authService.registerUser(user);

        RegisterResponse response = new RegisterResponse(
                savedUser.getId(),
                savedUser.getUsername()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.username(), request.password());
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Pong!");
    }
}