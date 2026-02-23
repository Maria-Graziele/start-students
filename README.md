# 🎓 Start Students

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen)
![Angular](https://img.shields.io/badge/Angular-8-red)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 📌 About the Project

**StartStudents** is a Fullstack application designed for complete student management.
The system implements full CRUD operations with clean architecture, validation rules,
exception handling, pagination and automated tests on both backend and frontend.

---

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- JUnit 5
- Mockito

### Frontend
- Angular 8
- TypeScript
- Jasmine + Karma
- Bootstrap

---

## 🏗️ Architecture

The project follows a layered architecture pattern:

Controller → Service → Repository → Database

- **Controller**: REST endpoints
- **Service**: Business rules
- **Repository**: Data access with Spring Data JPA
- **DTOs**: Request/Response data transfer
- **GlobalExceptionHandler**: Centralized error handling

---

## 📂 Project Structure

### Backend

```
src/main/java/com/backend/startstudents
├── config
├── controller
├── dto
│   ├── request
│   └── response
├── exception
├── model
├── repository
└── service
```

### Backend Tests

```
src/test/java/com/backend/startstudents
├── controller
├── service
├── repository
└── exception
```

### Frontend

```
src/app
├── core
├── features
│   ├── students
│   └── auth
├── shared
│   ├── components
│   ├── directives
│   ├── validators
│   └── utils
```

---

## ✨ Features

- Student registration
- Paginated listing
- Update student data
- Delete students
- Custom validators (CPF and phone mask)
- Global error handling
- Backend and frontend unit tests

---

## ⚙️ How to Run

### Backend

```bash
./mvnw spring-boot:run
```

or

```bash
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
npm install
ng serve
```

Application will be available at:

- Backend: http://localhost:8080
- Frontend: http://localhost:4200

---

## 🧪 Running Tests

### Backend
```bash
mvn clean test
```

### Frontend
```bash
ng test
```

---

## 📌 Future Improvements

- JWT Authentication
- Docker containerization
- Cloud deployment
- CI/CD with GitHub Actions

---

## 👩‍💻 Author

Maria Graziele  
Fullstack Developer – Java & Angular
