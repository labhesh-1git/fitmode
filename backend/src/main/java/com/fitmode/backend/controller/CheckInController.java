package com.fitmode.backend.controller;

import com.fitmode.backend.entity.DailyCheckIn;
import com.fitmode.backend.entity.HealthRecord;
import com.fitmode.backend.service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkin")
public class CheckInController {

    @Autowired
    private CheckInService checkInService;

    @PostMapping
    public HealthRecord checkIn(@RequestBody DailyCheckIn checkIn) {
        return checkInService.saveCheckIn(checkIn);
    }
}