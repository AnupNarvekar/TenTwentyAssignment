# Contest Participation System (Backend focused)

An application that allows users to participate in timed contests, answer questions, compete on a leaderboard and win prizes!.

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



# Setup Instructions

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
- `GET /api/users/contest-history` - Get user's contest history (requires authentication)
- `POST /api/users/buy-vip` - Get access to VIP contests (requires authentication)

### Contest API

- `GET /api/contests` - Get all contests
- `GET /api/contests/:contestId` - Get contest details
- `POST /api/contests/:contestId/participate` - Participate for an upcoming contest (requires authentication)
- `POST /api/contests/:contestId/submit` - Submit contest answers (requires authentication)
- `GET /api/contests/:contestId/leaderboard` - Get contest leaderboard