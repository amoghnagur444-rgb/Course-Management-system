# Full-Stack Course Management System

A lightweight, full-stack web application built to manage educational courses. This project demonstrates a complete CRUD (Create, Read, Update, Delete) lifecycle using the PERN stack, showcasing a decoupled frontend and backend architecture with a relational database.

## 🚀 Tech Stack

* **Frontend:** React.js (Vite)
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (using `pg` node-postgres)
* **API Testing:** Postman

## ✨ Features

* **Create:** Add new courses with a title and description.
* **Read:** Fetch and display a dynamic list of all available courses directly from the database.
* **Update:** Edit existing course details with a seamless frontend UI update.
* **Delete:** Remove courses from the database with confirmation handling.
* **RESTful API:** Clean, well-structured Express routing handling HTTP methods securely.

## 🛠️ Local Installation & Setup

To run this project locally, you will need Node.js and PostgreSQL installed on your machine.

### 1. Database Setup
1. Open your PostgreSQL terminal or pgAdmin.
2. Create the database: `CREATE DATABASE minicourse_db;`
3. Connect to `minicourse_db` and run the following SQL command to create the table:
   ```sql
   CREATE TABLE courses (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
Future Improvements:
1.Implement Role-Based Access Control (RBAC) with JWT authentication.
​2.Build out a comprehensive Postman test suite with automated assertions.
​3.Integrate an AI summarization tool to automatically generate course descriptions.
