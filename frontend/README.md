# Loan Manager App

A full-stack loan management application allowing users to register, login, create, view, update, and delete loan records. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## Features

- User Registration and Login with JWT
- CRUD for Loan Records (amount, interest, etc.)
- Loan `status` display (Pending / Approved)
- Toast notification for feedback
- Date-sorted loans by `createdAt`
- Welcome message after login
- Form validation (required fields)
- Secure routes (token protected)

---

## Tech Stack

| Layer        | Technology                 |
| ------------ | -------------------------- |
| Frontend     | React (Vite), TailwindCSS  |
| Backend      | Node.js, Express           |
| Database     | MongoDB (Mongoose)         |
| Auth         | JWT (JSON Web Token)       |
| CI/CD        | GitHub Actions             |
| Project Mgmt | JIRA                       |
| Diagrams     | Draw.io (SysML + Use Case) |

---

## Installation

```bash
# Clone repo
git clone https://github.com/your-username/sdlapps-main.git
cd sdlapps-main

# Backend
cd backend
npm install
cp .env.example .env  # Update MongoDB_URI
npm run dev

# Frontend
cd ../frontend
npm install
npm start
```
