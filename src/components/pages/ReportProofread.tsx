import { Edit3 } from 'lucide-react';

interface ReportProofreadProps {
  language: 'ko' | 'en';
}

export function ReportProofread({ language }: ReportProofreadProps) {
  const translations = {
    ko: {
      title: '보고서 윤문',
      description: '작성된 보고서의 내용을 검토하고 개선합니다.',
    },
    en: {
      title: 'Proofread Report',
      description: 'Review and improve the content of your report.',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Edit3 className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <textarea
          className="w-full h-96 px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500 resize-none"
          placeholder={language === 'ko' ? '보고서 내용을 입력하세요...' : 'Enter report content...'}
        />
      </div>
    </div>
  );
}
