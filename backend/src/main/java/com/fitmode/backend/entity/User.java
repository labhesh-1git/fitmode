package com.fitmode.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    

    @Column(unique = true)
    private String email;

    private String password;

    private Integer age;

    private String gender;

    private Double height;

    private Double weight;

    private Integer xp = 0;

    private Integer streak = 0;

    private Integer level = 1;

    private Boolean onboardingCompleted = false;

    private java.time.LocalDate lastCheckInDate;
    

    public User() {}

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Integer getXp() {
    return xp;
    }

    public void setXp(Integer xp) {
        this.xp = xp;
    }

    public Integer getStreak() {
        return streak;
    }

    public void setStreak(Integer streak) {
        this.streak = streak;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
}

    public Boolean getOnboardingCompleted() {
        return onboardingCompleted;
    }

    public void setOnboardingCompleted(Boolean onboardingCompleted) {
        this.onboardingCompleted = onboardingCompleted;
    }

    public java.time.LocalDate getLastCheckInDate() {
        return lastCheckInDate;
    }

    public void setLastCheckInDate(java.time.LocalDate lastCheckInDate) {
        this.lastCheckInDate = lastCheckInDate;
    }

}