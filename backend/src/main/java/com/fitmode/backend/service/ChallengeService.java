package com.fitmode.backend.service;

import com.fitmode.backend.entity.Challenge;
import com.fitmode.backend.repository.ChallengeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAll();
    }

    public Challenge saveChallenge(Challenge challenge) {
        return challengeRepository.save(challenge);
    }
}