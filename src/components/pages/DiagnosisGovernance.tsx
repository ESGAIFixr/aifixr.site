import { Shield } from 'lucide-react';

interface DiagnosisGovernanceProps {
  language: 'ko' | 'en';
}

export function DiagnosisGovernance({ language }: DiagnosisGovernanceProps) {
  const translations = {
    ko: {
      title: '자가진단 - Governance',
      description: '지배구조 부문 자가진단 결과를 확인합니다.',
      score: '지배구조 점수',
    },
    en: {
      title: 'Self-Diagnosis - Governance',
      description: 'View governance self-diagnosis results.',
      score: 'Governance Score',
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
        <div className="text-center">
          <div className="inline-block">
            <div className="text-lime-700 mb-2">{t.score}</div>
            <div className="text-6xl text-purple-600">68</div>
            <div className="text-gray-500">/100</div>
          </div>
        </div>
      </div>
    </div>
  );
}
