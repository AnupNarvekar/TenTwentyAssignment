import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom flex justify-between items-center py-3">
        <Link to="/" className="flex items-center space-x-2">
          <Trophy className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-primary-700">ContestHub</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
            Contests
          </Link>
          
          {state.user ? (
            <>
              <Link to="/history" className="text-gray-700 hover:text-primary-600 transition-colors">
                My History
              </Link>
              
              <div className="flex items-center space-x-2 ml-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-primary-600 mr-1" />
                  <span className="text-sm font-medium">{state.user.name}</span>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn bg-white text-primary-600 border border-primary-500 hover:bg-primary-50">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;