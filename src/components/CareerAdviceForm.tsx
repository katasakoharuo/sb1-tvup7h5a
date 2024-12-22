import React, { useState } from 'react';
import { PersonalityType } from '../types';

type Props = {
  personalityType: PersonalityType;
  onAdviceReceived: (advice: string) => void;
};

export const CareerAdviceForm: React.FC<Props> = ({ personalityType, onAdviceReceived }) => {
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [concerns, setConcerns] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{
            role: 'user',
            content: `以下の情報に基づいて、具体的なキャリアアドバイスを提供してください：
            
            性格タイプ: ${personalityType.code} (${personalityType.title})
            年齢: ${age}歳
            現在の職業: ${occupation}
            現状の悩み: ${concerns}
            
            性格タイプの特徴：
            ${personalityType.traits.join('\n')}
            `
          }]
        })
      });

      const data = await response.json();
      onAdviceReceived(data.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      alert('アドバイスの取得に失敗しました。APIキーを確認してください。');
    } finally {
      setIsLoading(false);
      setShowApiKeyModal(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="例：25"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">現在の職業</label>
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="例：システムエンジニア"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">現状の悩み</label>
          <textarea
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="例：キャリアの方向性に迷っている"
          />
        </div>
        <button
          onClick={() => setShowApiKeyModal(true)}
          className="w-full py-3 bg-green-600 text-white rounded-lg
                   hover:bg-green-700 transition-colors duration-200"
          disabled={!age || !occupation || !concerns}
        >
          専門家による精密診断を受ける
        </button>
      </div>

      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">OpenAI APIキーを入力</h3>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4"
              placeholder="sk-..."
            />
            <div className="flex space-x-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !apiKey}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors duration-200"
              >
                {isLoading ? '診断中...' : '診断開始'}
              </button>
              <button
                onClick={() => setShowApiKeyModal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg
                         hover:bg-gray-300 transition-colors duration-200"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};