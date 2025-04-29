export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface Contest {
  _id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  questions?: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswer?: string;
  score: number;
}

export interface Submission {
  _id: string;
  userId: string;
  contestId: string | Contest;
  answers: Record<string, string>;
  score: number;
  submittedAt: string;
}

export interface LeaderboardEntry {
  _id: string;
  contestId: string;
  userId: {
    _id: string;
    name: string;
  };
  score: number;
  rank: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface ContestState {
  contests: Contest[];
  activeContest: Contest | null;
  submissions: Submission[];
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
}