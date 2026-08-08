package com.fitmode.backend.repository;

import com.fitmode.backend.entity.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {

    Optional<HealthRecord> findByUserIdAndDate(Long userId, LocalDate date);

    List<HealthRecord> findByUserIdOrderByDateDesc(Long userId);

}