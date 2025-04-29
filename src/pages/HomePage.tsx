import React, { useEffect } from 'react';
import { useContest } from '../context/ContestContext';
import ContestCard from '../components/ContestCard';
import { Trophy } from 'lucide-react';

const HomePage: React.FC = () => {
  const { state, fetchContests } = useContest();
  
  useEffect(() => {
    fetchContests();
  }, []);
  
  // Separate contests by status
  const now = new Date();
  const activeContests = state.contests.filter(contest => 
    new Date(contest.startTime) <= now && new Date(contest.endTime) >= now
  );
  
  const upcomingContests = state.contests.filter(contest => 
    new Date(contest.startTime) > now
  ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const pastContests = state.contests.filter(contest => 
    new Date(contest.endTime) < now
  ).sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());

  if (state.isLoading) {
    return (
      <div className="container-custom min-h-screen flex justify-center items-center">
        <div className="animate-pulse-slow">
          <Trophy className="w-16 h-16 text-primary-300 mx-auto" />
          <p className="text-gray-400 mt-3">Loading contests...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="container-custom min-h-screen flex justify-center items-center">
        <div className="bg-error-50 text-error-700 p-6 rounded-lg shadow-sm max-w-lg text-center">
          <h2 className="text-xl font-medium mb-3">Error</h2>
          <p>{state.error}</p>
          <button 
            onClick={() => fetchContests()}
            className="mt-4 btn btn-danger"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary-800 mb-3">Contest Hub</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Participate in exciting contests, test your knowledge, and compete for the top spot on the leaderboard!
        </p>
      </div>
      
      {activeContests.length > 0 && (
        <div className="mb-12 animate-slide-up">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Active Contests</h2>
            <div className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Live Now
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeContests.map(contest => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </div>
      )}
      
      {upcomingContests.length > 0 && (
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Contests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingContests.map(contest => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </div>
      )}
      
      {pastContests.length > 0 && (
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Past Contests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastContests.map(contest => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        </div>
      )}
      
      {state.contests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Trophy className="w-20 h-20 text-gray-300 mb-4" />
          <h2 className="text-2xl font-medium text-gray-600 mb-2">No Contests Available</h2>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            There are no contests available at the moment. 
            Please check back later for upcoming events!
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;