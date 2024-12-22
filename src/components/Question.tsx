import React from 'react';
import { Question as QuestionType } from '../types';

type Props = {
  question: QuestionType;
  onAnswer: (type: string) => void;
  currentNumber: number;
  totalQuestions: number;
};

export const Question: React.FC<Props> = ({
  question,
  onAnswer,
  currentNumber,
  totalQuestions,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            質問 {currentNumber} / {totalQuestions}
          </span>
          <div className="w-full h-2 bg-gray-200 rounded-full ml-4">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{
                width: `${(currentNumber / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
      </div>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.type)}
            className="w-full p-4 text-left border rounded-lg hover:bg-blue-50 
                     transition-colors duration-200 hover:border-blue-500"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};