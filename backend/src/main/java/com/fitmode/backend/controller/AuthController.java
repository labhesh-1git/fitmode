package com.fitmode.backend.controller;

import com.fitmode.backend.dto.LoginRequest;
import com.fitmode.backend.entity.User;
import com.fitmode.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.fitmode.backend.dto.LoginResponse;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword());
    }

    @PostMapping("/onboarding/{userId}")
    public String onboarding(@PathVariable Long userId, @RequestBody com.fitmode.backend.dto.OnboardingRequest request) {
        authService.completeOnboarding(userId, request);
        return "Onboarding completed successfully";
    }

    @GetMapping("/profile/{id}")
    public User profile(@PathVariable Long id) {
        return authService.getProfile(id);
    }
    @GetMapping("/leaderboard")
    public List<User> leaderboard() {
        return authService.getLeaderboard();
    }
}