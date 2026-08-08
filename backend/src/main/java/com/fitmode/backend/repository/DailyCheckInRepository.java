package com.fitmode.backend.repository;

import com.fitmode.backend.entity.DailyCheckIn;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyCheckInRepository extends JpaRepository<DailyCheckIn, Long> {
    Optional<DailyCheckIn> findByUserIdAndDate(Long userId, LocalDate date);
}