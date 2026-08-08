package com.fitmode.backend.controller;

import com.fitmode.backend.entity.DailyCheckIn;
import com.fitmode.backend.service.CheckInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkin")
@CrossOrigin(origins = "http://localhost:5173")
public class CheckInController {

    @Autowired
    private CheckInService checkInService;

    @PostMapping
    public String checkIn(@RequestBody DailyCheckIn checkIn) {
        return checkInService.saveCheckIn(checkIn);
    }
}