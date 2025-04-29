import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Award } from 'lucide-react';
import { Submission } from '../types';

interface SubmissionHistoryProps {
  submissions: Submission[];
  isLoading: boolean;
}

const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({ submissions, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-pulse-slow">
          <Clock className="w-12 h-12 text-primary-300" />
          <p className="text-gray-400 mt-3">Loading submission history...</p>
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">No Submissions Yet</h3>
        <p className="text-gray-500 mb-6">You haven't participated in any contests yet.</p>
        <Link to="/" className="btn btn-primary inline-flex">
          Browse Contests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {submissions.map((submission) => {
        const contest = typeof submission.contestId === 'object' ? submission.contestId : null;
        const submittedDate = new Date(submission.submittedAt);
        
        return (
          <div 
            key={submission._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            <div className="p-6">
              {contest && (
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {contest.name}
                </h3>
              )}
              
              <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Submitted: {submittedDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</span>
                </div>
                
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="font-semibold text-primary-700">Score: {submission.score}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div>
                  {contest && (
                    <Link 
                      to={`/contests/${contest._id}/leaderboard`}
                      className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      View Leaderboard
                    </Link>
                  )}
                </div>
                
                {contest && (
                  <Link 
                    to={`/contests/${contest._id}`}
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded transition-colors"
                  >
                    Contest Details
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionHistory;