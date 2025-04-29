import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, Calendar, AlertCircle, CheckCircle, Trophy } from 'lucide-react';
import { useContest } from '../context/ContestContext';
import { useAuth } from '../context/AuthContext';
import QuestionCard from '../components/QuestionCard';

const ContestDetailPage: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const navigate = useNavigate();
  const { state: contestState, fetchContest, submitAnswers } = useContest();
  const { state: authState } = useAuth();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    if (contestId) {
      fetchContest(contestId);
    }
  }, [contestId]);
  
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };
  
  const handleSubmit = async () => {
    if (!contestId || !authState.user) return;
    
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Check if all questions are answered
      const contest = contestState.activeContest;
      if (contest && contest.questions) {
        const unansweredQuestions = contest.questions.filter(
          q => !answers[q._id]
        );
        
        if (unansweredQuestions.length > 0) {
          setSubmitError(`Please answer all questions before submitting (${unansweredQuestions.length} remaining)`);
          setIsSubmitting(false);
          return;
        }
      }
      
      await submitAnswers(contestId, answers);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      // Navigate to leaderboard after a brief delay
      setTimeout(() => {
        navigate(`/contests/${contestId}/leaderboard`);
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit answers');
      setIsSubmitting(false);
    }
  };
  
  if (contestState.isLoading) {
    return (
      <div className="container-custom flex justify-center items-center min-h-screen">
        <div className="animate-pulse-slow">
          <Clock className="w-16 h-16 text-primary-300 mx-auto" />
          <p className="text-gray-400 mt-3">Loading contest details...</p>
        </div>
      </div>
    );
  }
  
  if (contestState.error) {
    return (
      <div className="container-custom flex justify-center items-center min-h-screen">
        <div className="bg-error-50 text-error-700 p-6 rounded-lg shadow-sm max-w-lg text-center">
          <h2 className="text-xl font-medium mb-3">Error</h2>
          <p>{contestState.error}</p>
          <button 
            onClick={() => contestId && fetchContest(contestId)}
            className="mt-4 btn btn-danger"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  const contest = contestState.activeContest;
  if (!contest) {
    return (
      <div className="container-custom flex justify-center items-center min-h-screen">
        <div className="bg-error-50 text-error-700 p-6 rounded-lg shadow-sm max-w-lg text-center">
          <h2 className="text-xl font-medium mb-3">Contest Not Found</h2>
          <Link to="/" className="mt-4 btn btn-primary inline-block">
            Back to Contests
          </Link>
        </div>
      </div>
    );
  }
  
  // Check contest status
  const now = new Date();
  const startDate = new Date(contest.startTime);
  const endDate = new Date(contest.endTime);
  
  let contestStatus = 'upcoming';
  if (now > endDate) {
    contestStatus = 'ended';
  } else if (now >= startDate) {
    contestStatus = 'active';
  }
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="container-custom min-h-screen">
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">{contest.name}</h1>
          
          <div className="flex items-center">
            {contestStatus === 'active' && (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                Active
              </span>
            )}
            {contestStatus === 'upcoming' && (
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                Upcoming
              </span>
            )}
            {contestStatus === 'ended' && (
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                Ended
              </span>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-6">{contest.description}</p>
          
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2 text-primary-500" />
              <div>
                <p className="text-sm font-medium">Start Time</p>
                <p className="text-base">{formatDate(startDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2 text-secondary-500" />
              <div>
                <p className="text-sm font-medium">End Time</p>
                <p className="text-base">{formatDate(endDate)}</p>
              </div>
            </div>
            
            <Link to={`/contests/${contest._id}/leaderboard`} className="btn btn-secondary flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </Link>
          </div>
        </div>
      </div>
      
      {contestStatus === 'upcoming' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center animate-fade-in">
          <Clock className="h-10 w-10 text-blue-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Contest Hasn't Started Yet</h2>
          <p className="text-blue-700 mb-1">
            This contest will begin on {formatDate(startDate)}.
          </p>
          <p className="text-blue-600">
            Please check back when the contest is active to participate.
          </p>
        </div>
      )}
      
      {contestStatus === 'ended' && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center animate-fade-in">
          <CheckCircle className="h-10 w-10 text-gray-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contest Has Ended</h2>
          <p className="text-gray-700 mb-4">
            This contest ended on {formatDate(endDate)}.
          </p>
          <Link to={`/contests/${contest._id}/leaderboard`} className="btn btn-primary inline-flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            View Results
          </Link>
        </div>
      )}
      
      {contestStatus === 'active' && contest.questions && (
        <div className="animate-fade-in">
          {!authState.user ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-yellow-800 mb-2">Login Required</h2>
              <p className="text-yellow-700 mb-4">
                You need to be logged in to participate in this contest.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn bg-white text-primary-600 border border-primary-500 hover:bg-primary-50">
                  Register
                </Link>
              </div>
            </div>
          ) : submitSuccess ? (
            <div className="bg-success-50 border border-success-200 rounded-lg p-6 text-center">
              <CheckCircle className="h-10 w-10 text-success-500 mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-success-800 mb-2">Submission Successful!</h2>
              <p className="text-success-700 mb-4">
                Your answers have been submitted successfully. Redirecting to leaderboard...
              </p>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
                <div className="text-sm text-gray-600">
                  {Object.keys(answers).length} of {contest.questions.length} answered
                </div>
              </div>
              
              {contest.questions.map((question, index) => (
                <QuestionCard 
                  key={question._id}
                  question={question}
                  questionNumber={index + 1}
                  onAnswerSelect={handleAnswerSelect}
                  selectedAnswer={answers[question._id]}
                />
              ))}
              
              {submitError && (
                <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-6">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-error-500 mr-2" />
                    <p className="text-error-700">{submitError}</p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`btn btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Answers'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContestDetailPage;