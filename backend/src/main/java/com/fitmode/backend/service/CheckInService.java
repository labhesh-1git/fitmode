package com.fitmode.backend.service;

import com.fitmode.backend.entity.DailyCheckIn;
import com.fitmode.backend.entity.User;
import com.fitmode.backend.repository.DailyCheckInRepository;
import com.fitmode.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CheckInService {

    @Autowired
    private DailyCheckInRepository dailyCheckInRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.fitmode.backend.repository.HealthRecordRepository healthRecordRepository;

    public String saveCheckIn(DailyCheckIn checkIn) {

        User user = userRepository.findById(checkIn.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate targetDate = checkIn.getDate() != null ? checkIn.getDate() : LocalDate.now();
        checkIn.setDate(targetDate);

        // Check if there is already a check-in on targetDate to prevent duplicates
        // Use a list query or handle exception to guarantee safety
        java.util.List<com.fitmode.backend.entity.DailyCheckIn> existingCheckIns = dailyCheckInRepository.findAll().stream()
                .filter(d -> d.getUserId().equals(checkIn.getUserId()) && d.getDate().equals(targetDate))
                .toList();

        if (!existingCheckIns.isEmpty()) {
            com.fitmode.backend.entity.DailyCheckIn existingCheckIn = existingCheckIns.get(0);
            existingCheckIn.setWaterIntake(checkIn.getWaterIntake());
            existingCheckIn.setSteps(checkIn.getSteps());
            existingCheckIn.setWorkoutCompleted(checkIn.getWorkoutCompleted());
            existingCheckIn.setWeight(checkIn.getWeight());
            existingCheckIn.setEnergyLevel(checkIn.getEnergyLevel());
            dailyCheckInRepository.save(existingCheckIn);
        } else {
            dailyCheckInRepository.save(checkIn);
        }

        // Keep HealthRecord in sync
        com.fitmode.backend.entity.HealthRecord healthRecord = healthRecordRepository
                .findByUserIdAndDate(checkIn.getUserId(), targetDate)
                .orElse(new com.fitmode.backend.entity.HealthRecord());

        healthRecord.setUserId(checkIn.getUserId());
        healthRecord.setDate(targetDate);
        healthRecord.setWeight(checkIn.getWeight());
        healthRecord.setWaterIntake(checkIn.getWaterIntake());
        healthRecord.setSteps(checkIn.getSteps());
        
        // Calculate calories based on steps (e.g. 0.04 calories per step)
        int calories = (int) (checkIn.getSteps() * 0.04);
        if (checkIn.getWorkoutCompleted()) {
            calories += 300; // Extra workout calories
        }
        healthRecord.setCaloriesBurned(calories);

        double heightInMeters = user.getHeight() / 100.0;
        double bmi = checkIn.getWeight() / (heightInMeters * heightInMeters);
        healthRecord.setBmi(Math.round(bmi * 10.0) / 10.0);

        healthRecordRepository.save(healthRecord);

        user.setLastCheckInDate(targetDate);

        if (user.getXp() == null) user.setXp(0);
        if (user.getStreak() == null) user.setStreak(0);
        if (user.getLevel() == null) user.setLevel(1);

        user.setXp(user.getXp() + 20);
        user.setStreak(user.getStreak() + 1);
        user.setLevel((user.getXp() / 100) + 1);

        userRepository.save(user);

        return "Check-in completed successfully";
    }
}