# 💳 Digital Wallet

A full-stack digital wallet application built with **React** and **Spring Boot**, allowing users to manage wallet balances, send virtual money, add funds, and view transaction history through a RESTful backend.

> **Note:** This project uses virtual wallet transactions for learning and demonstration purposes. It does not process real-world payments.

## 🚀 Features

* User registration and login
* Secure password storage using BCrypt
* JWT-based authentication
* Digital wallet creation for users
* Add virtual money to wallet
* Send virtual money to another user
* View wallet balance
* Transaction history
* User profile management
* RESTful API architecture
* MySQL database integration
* React-based responsive frontend
* Dockerized backend and database setup

## 🏗️ Architecture

                    User
                     │
                     ▼
              React Frontend
                     │
                 REST APIs
                     │
                     ▼
             Spring Boot Backend
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
      Spring Security          JPA
          │                     │
          │                     ▼
          │                  MySQL
          │
          ▼
       JWT Auth

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Axios

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* BCrypt

### Database

* MySQL

### Development & Tools

* Git
* GitHub
* Docker
* Docker Compose
* Postman
* VS Code

## 📂 Project Structure

digital-wallet/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## 🔐 Authentication Flow

The application uses JWT-based authentication.

User Login
    │
    ▼
Spring Boot
    │
    ▼
Validate Credentials
    │
    ▼
Generate JWT
    │
    ▼
Return Token
    │
    ▼
React stores token
    │
    ▼
Token sent with protected API requests
```

Passwords are not stored as plain text. BCrypt is used for password hashing.

## 💰 Wallet Transaction Flow

For sending virtual money:
Sender
  │
  ▼
Send Money Request
  │
  ▼
Spring Boot API
  │
  ├── Validate Authentication
  ├── Find Sender Wallet
  ├── Find Receiver Wallet
  ├── Check Balance
  ├── Transfer Amount
  └── Record Transaction
          │
          ▼
       MySQL

## 🗄️ Database

The application uses **MySQL** for persistent storage.

Core entities include:

User
 │
 └── Wallet
       │
       └── Transactions
```

The backend uses **Spring Data JPA/Hibernate** for database operations and entity relationships.

## 🔌 API Design

The backend exposes REST APIs for operations such as:

POST   /api/auth/register
POST   /api/auth/login

GET    /api/wall
```
