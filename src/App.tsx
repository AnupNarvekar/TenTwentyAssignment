import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContestProvider } from './context/ContestContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ContestDetailPage from './pages/ContestDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import UserHistoryPage from './pages/UserHistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <ContestProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contests/:contestId" element={<ContestDetailPage />} />
                <Route path="/contests/:contestId/leaderboard" element={<LeaderboardPage />} />
                <Route path="/history" element={<UserHistoryPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <footer className="bg-white border-t border-gray-200 py-6">
              <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                <p>Contest Participation System © {new Date().getFullYear()}</p>
              </div>
            </footer>
          </div>
        </Router>
      </ContestProvider>
    </AuthProvider>
  );
}

export default App;