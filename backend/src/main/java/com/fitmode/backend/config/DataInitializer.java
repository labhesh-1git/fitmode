package com.fitmode.backend.config;


import com.fitmode.backend.entity.HealthRecord;
import com.fitmode.backend.repository.HealthRecordRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;



@Component
public class DataInitializer implements CommandLineRunner {


    private final HealthRecordRepository repository;


    public DataInitializer(HealthRecordRepository repository){
        this.repository = repository;
    }



    @Override
    public void run(String... args) {
        if(repository.count() == 0)
{
    for(int i=6;i>=0;i--)
    {
        HealthRecord record = new HealthRecord();

        record.setUserId(1L);

        record.setDate(
            LocalDate.now().minusDays(i)
        );

        record.setWeight(
            70.0 - (6-i)*0.1
        );

        record.setWaterIntake(
            2.5 + (i%2)
        );

        record.setSteps(
            8000+(6-i)*500
        );

        record.setCaloriesBurned(
            400+(6-i)*25
        );

        record.setBmi(
            22.9-(6-i)*0.05
        );

        repository.save(record);
    }
}



    }

}