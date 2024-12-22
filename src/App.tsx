import React, { useState } from 'react';
import { Question } from './components/Question';
import { Result } from './components/Result';
import { questions } from './data/questions';
import { personalityTypes } from './data/personality-types';
import { Answer } from './types';
import { ArrowRight } from 'lucide-react';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (type: string) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestionIndex].id,
      selectedType: type,
    };
    
    setAnswers([...answers, newAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    // Count occurrences of each type
    const typeCounts = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0,
    };

    answers.forEach(answer => {
      typeCounts[answer.selectedType as keyof typeof typeCounts]++;
    });

    // Determine the personality type
    const type = [
      typeCounts.E > typeCounts.I ? 'E' : 'I',
      typeCounts.S > typeCounts.N ? 'S' : 'N',
      typeCounts.T > typeCounts.F ? 'T' : 'F',
      typeCounts.J > typeCounts.P ? 'J' : 'P',
    ].join('');

    setPersonalityType(personalityTypes.find(t => t.code === type)!);
    setShowResult(true);
  };

  const [personalityType, setPersonalityType] = useState(personalityTypes[0]);

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (!showResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {currentQuestionIndex === 0 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">MBTI性格診断テスト</h1>
              <p className="text-gray-600 mb-8">
                20の質問であなたの性格タイプを診断します。
                直感的に最も近いと感じる回答を選んでください。
              </p>
            </div>
          )}
          
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Result personalityType={personalityType} onRetry={handleRetry} />
    </div>
  );
}

export default App;