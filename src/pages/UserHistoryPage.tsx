import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useContest } from '../context/ContestContext';
import SubmissionHistory from '../components/SubmissionHistory';

const UserHistoryPage: React.FC = () => {
  const { state: authState } = useAuth();
  const { state: contestState, fetchUserHistory } = useContest();
  
  useEffect(() => {
    if (authState.user) {
      fetchUserHistory();
    }
  }, [authState.user]);
  
  if (!authState.user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container-custom min-h-screen">
      <div className="flex items-center mb-8">
        <History className="h-7 w-7 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">My Contest History</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Submissions</h2>
        
        <SubmissionHistory 
          submissions={contestState.submissions} 
          isLoading={contestState.isLoading}
        />
      </div>
      
      <div className="mt-8 flex justify-center">
        <Link to="/" className="btn btn-primary">
          Explore More Contests
        </Link>
      </div>
    </div>
  );
};

export default UserHistoryPage;