import { Users } from 'lucide-react';

interface DiagnosisSocialProps {
  language: 'ko' | 'en';
}

export function DiagnosisSocial({ language }: DiagnosisSocialProps) {
  const translations = {
    ko: {
      title: '자가진단 - Social',
      description: '사회 부문 자가진단 결과를 확인합니다.',
      score: '사회 점수',
    },
    en: {
      title: 'Self-Diagnosis - Social',
      description: 'View social self-diagnosis results.',
      score: 'Social Score',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="text-center">
          <div className="inline-block">
            <div className="text-lime-700 mb-2">{t.score}</div>
            <div className="text-6xl text-blue-600">82</div>
            <div className="text-gray-500">/100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
