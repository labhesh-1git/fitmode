package com.fitmode.backend.controller;



import com.fitmode.backend.entity.HealthRecord;
import com.fitmode.backend.repository.HealthRecordRepository;

import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/analytics")
@CrossOrigin
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



        List<Double> weight = new ArrayList<>();
        List<Double> water = new ArrayList<>();
        List<Integer> steps = new ArrayList<>();
        List<Integer> calories = new ArrayList<>();


        for(HealthRecord log : logs){

            weight.add(log.getWeight());
            water.add(log.getWaterIntake());
            steps.add(log.getSteps());
            calories.add(log.getCaloriesBurned());

        }



        Map<String,Object> response = new HashMap<>();

        response.put("weight", weight);
        response.put("water", water);
        response.put("steps", steps);
        response.put("calories", calories);


        return response;

    }

}