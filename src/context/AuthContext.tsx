import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// Load user from localStorage
const loadUser = (): User | null => {
  const userJSON = localStorage.getItem('user');
  return userJSON ? JSON.parse(userJSON) : null;
};

initialState.user = loadUser();

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, error: null };
    case 'AUTH_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ 
        type: 'AUTH_FAIL', 
        payload: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);