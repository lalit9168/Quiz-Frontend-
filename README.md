# 🧠 Quiz App – MERN Stack Based Timed Quiz System

A full-stack quiz application built using **React**, **Node.js**, **Express**, and **MongoDB**. It allows admins to create quizzes with duration, and users to attempt quizzes with automatic timer tracking, auto-submit, and downloadable scorecards.

---

## 📌 Features

- 🛠 Admin can create quizzes with:
  - Title
  - Questions with options
  - Correct answers
  - Duration (in minutes)

- 👤 User Side:
  - JWT-authenticated login
  - View available quizzes by code
  - Start quiz only once
  - Countdown timer starts on start
  - Auto-submit when time expires
  - Manual submission support
  - Prevents re-attempt
  - Generates downloadable PDF scorecard

- 🧾 Scorecard PDF includes:
  - Name, email, quiz name
  - Total score
  - Question-wise answers with status

---

## 🧰 Tech Stack

### Frontend
- React (with React Router DOM)
- Material-UI (MUI)
- Axios
- jsPDF + autoTable

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- CORS

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
