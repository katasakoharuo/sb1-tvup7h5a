import React from 'react';

type Props = {
  advice: string;
};

export const CareerAdvice: React.FC<Props> = ({ advice }) => {
  return (
    <div className="mt-8 bg-green-50 p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">キャリアアドバイス</h4>
      <div className="prose prose-green">
        {advice.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};