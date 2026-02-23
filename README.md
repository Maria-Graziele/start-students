
# 🎓 StartStudents – Fullstack Student Management System

<p align="center">

<img src="https://img.shields.io/github/last-commit/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/languages/top/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/repo-size/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/github/issues/Maria-Graziele/start-students?style=for-the-badge" />
<img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=java&logoColor=white" />
<img src="https://img.shields.io/badge/Spring_Boot-Backend-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/Angular-8-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />

</p>

---

## 📌 About the Project

**StartStudents** is a Fullstack application designed for complete student management.
The system implements full CRUD operations with clean architecture, validation rules,
exception handling, pagination and automated tests on both backend and frontend.

This project demonstrates strong knowledge in:

- REST API development
- Layered architecture
- DTO pattern
- Global exception handling
- Frontend modular organization
- Unit testing (backend and frontend)

---

## 🏗 System Architecture

### 🔹 Backend Architecture (Spring Boot)

Layered structure:

Controller → Service → Repository → Database

- Controllers: REST endpoints
- Services: Business rules
- Repository: Data access (Spring Data JPA)
- DTOs: Request/Response data transfer
- GlobalExceptionHandler: Centralized error handling

Project structure:

src/main/java/com.backend.startstudents
├── config
├── controller
├── dto
│   ├── request
│   └── response
├── exception
├── model
├── repository
└── service

Test structure:

src/test/java/com.backend.startstudents
├── controller
├── service
├── repository
└── exception

---

### 🔹 Frontend Architecture (Angular 8)

Organized by features and shared modules.

src/app
├── core
├── features
│   ├── alunos
│   └── auth
├── shared
│   ├── components
│   ├── directives
│   ├── validators
│   └── utils

Highlights:
- Feature-based organization
- Reusable shared components
- Custom directives (CPF and phone mask)
- Custom validators
- Unit tests with Jasmine + Karma

---

## 🚀 Features

- Create student
- Update student
- Delete student
- List students with pagination
- Search functionality
- Photo upload and display
- Custom validations
- Global error handling
- Unit tests (Backend and Frontend)

---

## 🛠 Technologies

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- JUnit
- Mockito

### Frontend
- Angular 8
- TypeScript
- SCSS
- Jasmine
- Karma

---

## 🗄 Database

- PostgreSQL
- JPA Entity mapping
- Auto-generated ID
- Column constraints and validations

---

## ⚙️ How to Run the Project

### 🔹 Backend

1. Create PostgreSQL database:

CREATE DATABASE startstudents;

2. Configure application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/startstudents
spring.datasource.username=your_user
spring.datasource.password=your_password

3. Run:

mvn clean install
mvn spring-boot:run

Backend available at:
http://localhost:8080

Run tests:
mvn test

---

### 🔹 Frontend

Install dependencies:

npm install

Run application:

ng serve

Frontend available at:
http://localhost:4200

Run tests:
ng test

---

## 🧪 Testing Strategy

Backend:
- Unit tests per layer
- Mockito for dependency mocking
- Validation and exception scenarios covered

Frontend:
- Component tests
- Validation tests
- Service tests

---

## 📈 Project Highlights

- Clean and scalable architecture
- Separation of responsibilities
- DTO pattern for secure API communication
- Centralized exception handling
- Organized frontend structure
- Automated testing on both layers
- Ready for CI/CD integration

---

## 👩‍💻 Author

Maria Graziele  
Fullstack Developer – Java & Angular
