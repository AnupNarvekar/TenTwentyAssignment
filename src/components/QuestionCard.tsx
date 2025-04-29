import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onAnswerSelect: (questionId: string, answer: string) => void;
  selectedAnswer?: string;
  isSubmitted?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionNumber, 
  onAnswerSelect,
  selectedAnswer,
  isSubmitted = false
}) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    if (!isSubmitted) {
      onAnswerSelect(question._id, option);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
      <div className="flex items-start mb-4">
        <span className="flex-shrink-0 bg-primary-100 text-primary-800 font-semibold rounded-full w-8 h-8 flex items-center justify-center mr-3">
          {questionNumber}
        </span>
        <h3 className="text-lg font-medium text-gray-800">{question.text}</h3>
      </div>
      
      <div className="space-y-3 mt-4">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all
              ${selectedAnswer === option 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }
              ${hoveredOption === option ? 'border-primary-300 bg-primary-50' : ''}
              ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}
            `}
            onClick={() => handleOptionClick(option)}
            onMouseEnter={() => setHoveredOption(option)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3
              ${selectedAnswer === option 
                ? 'border-primary-500 bg-primary-500 text-white' 
                : 'border-gray-300'
              }
            `}>
              {selectedAnswer === option && <CheckCircle className="w-4 h-4" />}
            </div>
            <span className="text-gray-700">{option}</span>
          </div>
        ))}
      </div>
      
      {isSubmitted && question.correctAnswer && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-500">Correct Answer: 
            <span className="ml-1 text-success-600">{question.correctAnswer}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;