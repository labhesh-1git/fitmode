package com.fitmode.backend.service;

import com.fitmode.backend.entity.HealthRecord;
import com.fitmode.backend.entity.User;
import com.fitmode.backend.repository.HealthRecordRepository;
import com.fitmode.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HealthService {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private UserRepository userRepository;

    // Save today's health record
    public HealthRecord saveHealthRecord(HealthRecord record) {

        record.setDate(LocalDate.now());

        User user = userRepository.findById(record.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
        // Check if today's record already exists
        HealthRecord existing = healthRecordRepository
                .findByUserIdAndDate(record.getUserId(), LocalDate.now())
                .orElse(null);

        if (existing != null) {
            existing.setWeight(record.getWeight());
            existing.setWaterIntake(record.getWaterIntake());
            existing.setSteps(record.getSteps());
            existing.setCaloriesBurned(record.getCaloriesBurned());
            record = existing;
}


        double heightInMeters = user.getHeight() / 100.0;
        double bmi = record.getWeight() / (heightInMeters * heightInMeters);

        record.setBmi(Math.round(bmi * 10.0) / 10.0);

        // Save health record
        HealthRecord saved = healthRecordRepository.save(record);

        // Award XP
        if (user.getXp() == null) user.setXp(0);
        if (user.getStreak() == null) user.setStreak(0);
        if (user.getLevel() == null) user.setLevel(1);

        user.setXp(user.getXp() + 10);

        // Simple level system (every 100 XP = next level)
        user.setLevel((user.getXp() / 100) + 1);

        // Increase streak
        user.setStreak(user.getStreak() + 1);

        // Save updated user
        userRepository.save(user);

        return saved;
    }

    // Get today's record
    public HealthRecord getTodayRecord(Long userId) {
        return healthRecordRepository
                .findByUserIdAndDate(userId, LocalDate.now())
                .orElse(null);
    }

    // Get full history
    public List<HealthRecord> getHistory(Long userId) {
        return healthRecordRepository.findByUserIdOrderByDateDesc(userId);
    }
}