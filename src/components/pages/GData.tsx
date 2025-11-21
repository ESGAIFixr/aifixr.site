import { Shield } from 'lucide-react';

interface GDataProps {
  language: 'ko' | 'en';
}

export function GData({ language }: GDataProps) {
  const translations = {
    ko: {
      title: 'G 데이터 (지배구조)',
      description: '지배구조 관련 데이터를 입력합니다.',
      boardSize: '이사회 규모 (명)',
      independence: '사외이사 비율 (%)',
      meetings: '이사회 개최 횟수 (회)',
      attendance: '이사회 참석률 (%)',
    },
    en: {
      title: 'G Data (Governance)',
      description: 'Enter governance data.',
      boardSize: 'Board Size (members)',
      independence: 'Independent Director Ratio (%)',
      meetings: 'Board Meetings (times)',
      attendance: 'Board Attendance Rate (%)',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2">{t.boardSize}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.independence}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.meetings}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.attendance}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
