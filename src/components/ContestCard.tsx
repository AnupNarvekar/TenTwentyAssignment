import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Calendar } from 'lucide-react';
import { Contest } from '../types';

interface ContestCardProps {
  contest: Contest;
}

const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const startDate = new Date(contest.startTime);
  const endDate = new Date(contest.endTime);
  const now = new Date();
  
  // Calculate contest status
  let status = 'Upcoming';
  let statusColor = 'bg-blue-100 text-blue-800';
  
  if (now > endDate) {
    status = 'Ended';
    statusColor = 'bg-gray-100 text-gray-800';
  } else if (now >= startDate && now <= endDate) {
    status = 'Active';
    statusColor = 'bg-green-100 text-green-800';
  }
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Calculate time remaining or time since end
  const getTimeInfo = () => {
    if (status === 'Upcoming') {
      const timeUntilStart = startDate.getTime() - now.getTime();
      const daysUntilStart = Math.floor(timeUntilStart / (1000 * 60 * 60 * 24));
      const hoursUntilStart = Math.floor((timeUntilStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      return `Starts in ${daysUntilStart}d ${hoursUntilStart}h`;
    } else if (status === 'Active') {
      const timeUntilEnd = endDate.getTime() - now.getTime();
      const hoursUntilEnd = Math.floor(timeUntilEnd / (1000 * 60 * 60));
      const minutesUntilEnd = Math.floor((timeUntilEnd % (1000 * 60 * 60)) / (1000 * 60));
      
      return `Ends in ${hoursUntilEnd}h ${minutesUntilEnd}m`;
    } else {
      return `Ended on ${formatDate(endDate)}`;
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="relative">
        <div className="h-3 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500"></div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{contest.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
              {status}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{contest.description}</p>
          
          <div className="flex flex-col space-y-2 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Start: {formatDate(startDate)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-2" />
              <span>{getTimeInfo()}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <Link to={`/contests/${contest._id}/leaderboard`} className="text-primary-600 hover:underline">
                View Leaderboard
              </Link>
            </div>
            
            <Link 
              to={`/contests/${contest._id}`} 
              className={`btn ${status === 'Active' ? 'btn-primary' : status === 'Upcoming' ? 'btn-secondary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {status === 'Active' ? 'Participate' : status === 'Upcoming' ? 'View Details' : 'View Results'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;