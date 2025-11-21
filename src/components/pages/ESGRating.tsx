import { Award } from 'lucide-react';

interface ESGRatingProps {
  language: 'ko' | 'en';
}

export function ESGRating({ language }: ESGRatingProps) {
  const translations = {
    ko: {
      title: 'ESG 등급 확인',
      description: '귀사의 ESG 등급을 확인합니다.',
      rating: '현재 등급',
      improvement: '개선 필요 영역',
      strengths: '강점 영역',
    },
    en: {
      title: 'ESG Rating',
      description: 'Check your company\'s ESG rating.',
      rating: 'Current Rating',
      improvement: 'Areas for Improvement',
      strengths: 'Strengths',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Award className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="text-lime-700 mb-2">{t.rating}</div>
            <div className="text-8xl text-lime-700">B+</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <h3 className="text-red-700 mb-4">{t.improvement}</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• {language === 'ko' ? '탄소 배출 관리' : 'Carbon Emission Management'}</li>
              <li>• {language === 'ko' ? '이사회 독립성' : 'Board Independence'}</li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-green-700 mb-4">{t.strengths}</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• {language === 'ko' ? '직원 교육 프로그램' : 'Employee Training Programs'}</li>
              <li>• {language === 'ko' ? '다양성 정책' : 'Diversity Policies'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
