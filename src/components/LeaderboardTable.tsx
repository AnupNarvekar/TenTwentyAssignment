import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  isLoading: boolean;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ entries, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-pulse-slow">
          <Trophy className="w-12 h-12 text-primary-300" />
          <p className="text-gray-400 mt-3">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">No Entries Yet</h3>
        <p className="text-gray-500">Be the first to complete this contest and claim the top spot!</p>
      </div>
    );
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning-100">
          <Trophy className="w-5 h-5 text-warning-500" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
          <Medal className="w-5 h-5 text-gray-500" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-100">
          <Medal className="w-5 h-5 text-accent-500" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border border-gray-200">
          <span className="text-gray-700 font-medium">{rank}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden animate-fade-in">
      <div className="bg-primary-600 py-4 px-6">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Trophy className="w-5 h-5 mr-2" />
          Leaderboard
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participant
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries.map((entry) => (
              <tr 
                key={entry._id} 
                className={entry.rank <= 3 ? 'bg-gray-50' : ''}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRankBadge(entry.rank)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {entry.userId.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-semibold">
                    {entry.score} pts
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderboardTable;