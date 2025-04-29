# Contest Participation System

A full-stack application that allows users to participate in timed contests, answer questions, and compete on a leaderboard.

## Technologies Used

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose

## Features

- User authentication (register, login)
- Browse active, upcoming, and past contests
- Participate in active contests by answering questions
- Real-time scoring and leaderboard
- User history tracking

## Project Structure

The project is organized into a client-side React application and a server-side Node.js API.

### Backend Structure

- `/backend/models`: MongoDB schemas
- `/backend/routes`: API endpoints
- `/backend/middleware`: Authentication middleware
- `/backend/utils`: Utility functions

### Frontend Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Page components
- `/src/context`: React context providers
- `/src/types`: TypeScript type definitions

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/contest-system
   JWT_SECRET=your_jwt_secret_key_here
   ```

### Running the Application

1. Start the backend server:
   ```
   npm run server
   ```
2. In a separate terminal, start the frontend development server:
   ```
   npm run dev
   ```
3. Access the application at `http://localhost:5173`

## API Endpoints

### User API

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/:userId/history` - Get user contest history (requires authentication)

### Contest API

- `GET /api/contests` - Get all contests
- `GET /api/contests/:contestId` - Get contest details
- `POST /api/contests/:contestId/submit` - Submit contest answers (requires authentication)
- `GET /api/contests/:contestId/leaderboard` - Get contest leaderboard

## Database Schema

- User: userId, name, email, password, timestamps
- Contest: contestId, name, description, startTime, endTime, questions, timestamps
- Question: questionId, text, options, correctAnswer, score, timestamps
- Submission: submissionId, userId, contestId, answers, score, submittedAt, timestamps
- Leaderboard: contestId, userId, score, rank, timestamps