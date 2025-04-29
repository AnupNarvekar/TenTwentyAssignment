import React, { createContext, useContext, useReducer } from 'react';
import { Contest, Question, Submission, LeaderboardEntry, ContestState } from '../types';
import { useAuth } from './AuthContext';

interface ContestAction {
  type: string;
  payload?: any;
}

interface ContestContextType {
  state: ContestState;
  fetchContests: () => Promise<void>;
  fetchContest: (id: string) => Promise<void>;
  submitAnswers: (contestId: string, answers: Record<string, string>) => Promise<void>;
  fetchLeaderboard: (contestId: string) => Promise<void>;
  fetchUserHistory: () => Promise<void>;
}

const initialState: ContestState = {
  contests: [],
  activeContest: null,
  submissions: [],
  leaderboard: [],
  isLoading: false,
  error: null,
};

const ContestContext = createContext<ContestContextType>({} as ContestContextType);

const contestReducer = (state: ContestState, action: ContestAction): ContestState => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_CONTESTS_SUCCESS':
      return { ...state, isLoading: false, contests: action.payload, error: null };
    case 'FETCH_CONTEST_SUCCESS':
      return { ...state, isLoading: false, activeContest: action.payload, error: null };
    case 'FETCH_SUBMISSIONS_SUCCESS':
      return { ...state, isLoading: false, submissions: action.payload, error: null };
    case 'FETCH_LEADERBOARD_SUCCESS':
      return { ...state, isLoading: false, leaderboard: action.payload, error: null };
    case 'FETCH_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'SUBMIT_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        submissions: [...state.submissions, action.payload],
        error: null 
      };
    default:
      return state;
  }
};

export const ContestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(contestReducer, initialState);
  const { state: authState } = useAuth();

  const fetchContests = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      
      const response = await fetch('http://localhost:5000/api/contests');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contests');
      }
      
      dispatch({ type: 'FETCH_CONTESTS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  const fetchContest = async (id: string) => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      
      const response = await fetch(`http://localhost:5000/api/contests/${id}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contest');
      }
      
      dispatch({ type: 'FETCH_CONTEST_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  const submitAnswers = async (contestId: string, answers: Record<string, string>) => {
    try {
      if (!authState.user || !authState.user.token) {
        throw new Error('Not authenticated');
      }
      
      dispatch({ type: 'FETCH_REQUEST' });
      
      const response = await fetch(`http://localhost:5000/api/contests/${contestId}/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.user.token}`
        },
        body: JSON.stringify({ answers }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit answers');
      }
      
      dispatch({ type: 'SUBMIT_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({ 
        type: 'FETCH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
      throw error;
    }
  };

  const fetchLeaderboard = async (contestId: string) => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      
      const response = await fetch(`http://localhost:5000/api/contests/${contestId}/leaderboard`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch leaderboard');
      }
      
      dispatch({ type: 'FETCH_LEADERBOARD_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  const fetchUserHistory = async () => {
    try {
      if (!authState.user || !authState.user.token) {
        throw new Error('Not authenticated');
      }
      
      dispatch({ type: 'FETCH_REQUEST' });
      
      const response = await fetch(`http://localhost:5000/api/users/${authState.user._id}/history`, {
        headers: { 
          'Authorization': `Bearer ${authState.user.token}`
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user history');
      }
      
      dispatch({ type: 'FETCH_SUBMISSIONS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  return (
    <ContestContext.Provider value={{ 
      state, 
      fetchContests, 
      fetchContest, 
      submitAnswers, 
      fetchLeaderboard,
      fetchUserHistory
    }}>
      {children}
    </ContestContext.Provider>
  );
};

export const useContest = () => useContext(ContestContext);