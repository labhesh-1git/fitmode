package com.fitmode.backend.repository;

import com.fitmode.backend.entity.HealthLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthLogRepository 
extends JpaRepository<HealthLog, Long> {

    List<HealthLog> findByUserId(Long userId);

}