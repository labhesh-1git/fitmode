package com.fitmode.backend.controller;



import com.fitmode.backend.entity.HealthRecord;
import com.fitmode.backend.repository.HealthRecordRepository;

import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/analytics")
public class AnalyticsController {


    private final HealthRecordRepository repository;


    public AnalyticsController(HealthRecordRepository repository){
        this.repository = repository;
    }



    @GetMapping("/weekly/{userId}")
    public Map<String,Object> getWeeklyAnalytics(
            @PathVariable Long userId
    ){

        List<HealthRecord> logs =
                repository.findByUserIdOrderByDateDesc(userId);

        // Get the latest 8 logs
        if (logs.size() > 8) {
            logs = logs.subList(0, 8);
        }
        // Reverse them to be in chronological order (oldest to newest)
        Collections.reverse(logs);

        List<Double> weight = new ArrayList<>();
        List<Double> water = new ArrayList<>();
        List<Integer> steps = new ArrayList<>();
        List<Integer> calories = new ArrayList<>();
        List<String> dates = new ArrayList<>();

        for(HealthRecord log : logs){
            weight.add(log.getWeight());
            water.add(log.getWaterIntake());
            steps.add(log.getSteps());
            calories.add(log.getCaloriesBurned());
            // Format date as MM-dd
            dates.add(log.getDate().getMonthValue() + "-" + log.getDate().getDayOfMonth());
        }

        Map<String,Object> response = new HashMap<>();

        response.put("weight", weight);
        response.put("water", water);
        response.put("steps", steps);
        response.put("calories", calories);
        response.put("dates", dates);

        return response;

    }

}