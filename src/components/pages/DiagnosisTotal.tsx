import { BarChart3 } from 'lucide-react';

interface DiagnosisTotalProps {
  language: 'ko' | 'en';
}

export function DiagnosisTotal({ language }: DiagnosisTotalProps) {
  const translations = {
    ko: {
      title: '자가진단 - Total',
      description: '전체 ESG 자가진단 결과를 확인합니다.',
      overallScore: '종합 점수',
      eScore: 'E (환경) 점수',
      sScore: 'S (사회) 점수',
      gScore: 'G (지배구조) 점수',
    },
    en: {
      title: 'Self-Diagnosis - Total',
      description: 'View overall ESG self-diagnosis results.',
      overallScore: 'Overall Score',
      eScore: 'E (Environment) Score',
      sScore: 'S (Social) Score',
      gScore: 'G (Governance) Score',
    },
  };

  const t = translations[language];

  const scores = [
    { label: t.eScore, value: 75, color: 'bg-green-500' },
    { label: t.sScore, value: 82, color: 'bg-blue-500' },
    { label: t.gScore, value: 68, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="text-lime-700 mb-2">{t.overallScore}</div>
            <div className="text-6xl text-lime-700">75</div>
            <div className="text-gray-500">/100</div>
          </div>
        </div>

        <div className="space-y-6">
          {scores.map((score, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span>{score.label}</span>
                <span>{score.value}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`${score.color} h-4 rounded-full transition-all`}
                  style={{ width: `${score.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
