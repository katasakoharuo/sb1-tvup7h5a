import React, { useState } from 'react';
import { PersonalityType } from '../types';
import { CareerAdviceForm } from './CareerAdviceForm';
import { CareerAdvice } from './CareerAdvice';

type Props = {
  personalityType: PersonalityType;
  onRetry: () => void;
};

export const Result: React.FC<Props> = ({ personalityType, onRetry }) => {
  const [careerAdvice, setCareerAdvice] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2 text-center">
          あなたの性格タイプは...
        </h2>
        <div className="text-4xl font-bold text-center text-blue-600 mb-4">
          {personalityType.code}
        </div>
        <h3 className="text-xl font-semibold text-center mb-6">
          {personalityType.title}
        </h3>
        <p className="text-gray-700 mb-6">{personalityType.description}</p>
        
        <div className="mb-8">
          <h4 className="font-semibold mb-4">主な特徴：</h4>
          <ul className="space-y-2">
            {personalityType.traits.map((trait, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {trait}
              </li>
            ))}
          </ul>
        </div>

        <CareerAdviceForm 
          personalityType={personalityType}
          onAdviceReceived={setCareerAdvice}
        />

        {careerAdvice && <CareerAdvice advice={careerAdvice} />}
        
        <button
          onClick={onRetry}
          className="w-full py-3 bg-blue-600 text-white rounded-lg
                   hover:bg-blue-700 transition-colors duration-200 mt-8"
        >
          もう一度診断する
        </button>
      </div>
    </div>
  );
};