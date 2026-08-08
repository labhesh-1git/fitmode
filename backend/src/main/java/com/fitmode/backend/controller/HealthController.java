package com.fitmode.backend.controller;

import com.fitmode.backend.entity.HealthRecord;
import com.fitmode.backend.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/health")
@CrossOrigin(origins = "http://localhost:5173")
public class HealthController {

    @Autowired
    private HealthService healthService;

    // Save today's health data
    @PostMapping
    public HealthRecord save(@RequestBody HealthRecord record) {
        return healthService.saveHealthRecord(record);
    }

    // Get today's health data
    @GetMapping("/today/{userId}")
    public HealthRecord today(@PathVariable Long userId) {
        return healthService.getTodayRecord(userId);
    }

    // Get complete history
    @GetMapping("/history/{userId}")
    public List<HealthRecord> history(@PathVariable Long userId) {
        return healthService.getHistory(userId);
    }
}