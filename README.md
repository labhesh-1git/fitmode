# FitMode — LeetCode of Fitness

FitMode is a full-stack fitness tracking platform inspired by LeetCode and modern gym apps. The idea was to make fitness feel like a gamified coding platform where users complete daily challenges, earn XP, maintain streaks, and track long-term progress through analytics and a GitHub-style heatmap.

## Project overview

The platform combines a React frontend with a Spring Boot backend and a MySQL database. It supports user authentication, onboarding, daily fitness logging, challenge tracking, analytics, leaderboards, and a profile page designed similarly to LeetCode.

## My development phases

### Phase 1 — Planning and UI inspiration

I started by defining the product concept: a fitness platform that feels like LeetCode rather than a traditional gym app. I studied interfaces such as LeetCode and modern fitness landing pages and planned the user flow from landing page to signup, login, daily check-in, dashboard, challenges, and profile.

### Phase 2 — Frontend foundation

I built the frontend using React and Vite. I created reusable components and organized the application into pages such as Landing, Login, Signup, DailyCheckIn, Dashboard, Challenges, Analytics, and Profile. Tailwind CSS was used to build a responsive dark-and-red interface.

### Phase 3 — Authentication system

I implemented signup and login using Spring Boot REST APIs. User credentials are stored in MySQL, and the backend returns the user state after login so the frontend can decide whether onboarding or daily analytics should be shown.

### Phase 4 — One-time onboarding

New users complete an onboarding form where information such as height, weight, age, gender, and fitness goals is collected. This data is stored only once and is later used to generate personalized challenges and analytics.

### Phase 5 — Daily analytics on every login

I designed a separate daily analytics flow that appears whenever a user logs in. Unlike onboarding, it asks only for yesterday’s data such as calories, protein intake, water intake, sleep, steps, workout duration, and challenge completion. The user also selects the date and day so historical graphs become realistic.

### Phase 6 — Dashboard and challenge system

The dashboard displays streaks, XP, steps, calories, hydration, and workout progress. Daily challenges can be marked as completed with animations and rewards, and editable fitness metrics can be updated directly from the dashboard.

### Phase 7 — Analytics and profile

I added charts for weight trends, calorie trends, hydration, and activity. The profile page includes a GitHub-style consistency heatmap, achievement badges, streak information, XP progression, and personal records similar to a LeetCode profile.

### Phase 8 — Backend architecture

The backend was built with Spring Boot using a layered architecture:

* Controllers for REST APIs
* Services for business logic
* Repositories using Spring Data JPA
* Entities for users, health records, challenges, and daily check-ins

This structure keeps the project scalable and easy to maintain.

### Phase 9 — Database design

MySQL stores users, onboarding data, daily health logs, challenge progress, and analytics history. Relationships between entities were managed using JPA annotations, and Hibernate handled schema updates during development.

### Phase 10 — Deployment

The frontend was deployed on Vercel, and the backend was prepared for cloud deployment using Spring Boot with externalized environment variables for database configuration.

## Tech stack

Frontend: React, Vite, Tailwind CSS

Backend: Spring Boot, Spring Data JPA, Spring Security

Database: MySQL

Deployment: Vercel (frontend), cloud-ready Spring Boot backend

## Key features

* Secure signup and login
* One-time onboarding
* Daily analytics on every login
* Personalized fitness tracking
* XP and streak system
* Daily and weekly challenges
* GitHub-style heatmap
* Interactive analytics dashboard
* LeetCode-inspired profile page
* Responsive dark-and-red UI

## What I learned

This project helped me understand full-stack application development, REST API design, React state management, Spring Boot architecture, relational database design, and deployment workflows. The biggest challenge was synchronizing frontend routing with backend user state so onboarding and daily check-ins appeared at the correct time.
