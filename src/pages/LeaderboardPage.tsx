import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useContest } from '../context/ContestContext';
import LeaderboardTable from '../components/LeaderboardTable';

const LeaderboardPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const { state, fetchLeaderboard, fetchContest } = useContest();
  
  useEffect(() => {
    if (contestId) {
      fetchLeaderboard(contestId);
      fetchContest(contestId);
    }
  }, [contestId]);
  
  const contest = state.activeContest;
  
  return (
    <div className="container-custom min-h-screen">
      <div className="mb-6">
        <Link to={contestId ? `/contests/${contestId}` : '/'} className="flex items-center text-primary-600 hover:text-primary-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to {contest ? 'Contest' : 'Contests'}</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800">
          {contest ? `${contest.name} - Leaderboard` : 'Leaderboard'}
        </h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-fade-in">
        {contest && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{contest.name}</h2>
            <p className="text-gray-600 mb-4">{contest.description}</p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="font-medium">{new Date(contest.startTime).toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-500">End Time</p>
                <p className="font-medium">{new Date(contest.endTime).toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {new Date() > new Date(contest.endTime) 
                    ? 'Ended' 
                    : new Date() >= new Date(contest.startTime) 
                      ? 'Active' 
                      : 'Upcoming'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <LeaderboardTable 
          entries={state.leaderboard} 
          isLoading={state.isLoading} 
        />
      </div>
    </div>
  );
};

export default LeaderboardPage;