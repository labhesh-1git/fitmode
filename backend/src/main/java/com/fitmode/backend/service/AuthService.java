package com.fitmode.backend.service;

import com.fitmode.backend.entity.User;
import com.fitmode.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import com.fitmode.backend.dto.LoginResponse;
import java.time.LocalDate;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Register method
    public String register(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return "User registered successfully";
    }

    // Login method
    public LoginResponse login(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        LoginResponse response = new LoginResponse();

        response.setUserId(user.getId());

        response.setOnboardingCompleted(
                user.getOnboardingCompleted() != null
                        ? user.getOnboardingCompleted()
                        : false
        );

        boolean checkInRequired = true;

        if (user.getOnboardingCompleted() == null || !user.getOnboardingCompleted()) {
            checkInRequired = false;
        } else if (user.getLastCheckInDate() != null &&
                user.getLastCheckInDate().equals(LocalDate.now())) {
            checkInRequired = false;
        }

        response.setCheckInRequired(checkInRequired);

        return response;
    }

    public void completeOnboarding(Long userId, com.fitmode.backend.dto.OnboardingRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setAge(request.getAge());
        user.setGender(request.getGender());
        user.setHeight(request.getHeight());
        user.setWeight(request.getWeight());
        user.setOnboardingCompleted(true);
        userRepository.save(user);
    }

    public User getProfile(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getLeaderboard() {
        return userRepository.findAllByOrderByXpDesc();
    }
    
}