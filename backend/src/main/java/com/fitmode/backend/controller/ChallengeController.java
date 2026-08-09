package com.fitmode.backend.controller;

import com.fitmode.backend.entity.Challenge;
import com.fitmode.backend.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenges")
public class ChallengeController {

    @Autowired
    private ChallengeService challengeService;

    @GetMapping
    public List<Challenge> getChallenges() {
        return challengeService.getAllChallenges();
    }

    @PostMapping
    public Challenge addChallenge(@RequestBody Challenge challenge) {
        return challengeService.saveChallenge(challenge);
    }
}