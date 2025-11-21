import { Users } from 'lucide-react';

interface SDataProps {
  language: 'ko' | 'en';
}

export function SData({ language }: SDataProps) {
  const translations = {
    ko: {
      title: 'S 데이터 (사회)',
      description: '사회 관련 데이터를 입력합니다.',
      diversity: '여성 임직원 비율 (%)',
      training: '교육 시간 (시간/인)',
      safety: '산업재해율 (%)',
      satisfaction: '직원 만족도 (점)',
    },
    en: {
      title: 'S Data (Social)',
      description: 'Enter social data.',
      diversity: 'Female Employee Ratio (%)',
      training: 'Training Hours (hours/person)',
      safety: 'Industrial Accident Rate (%)',
      satisfaction: 'Employee Satisfaction (score)',
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
        <div className="space-y-6">
          <div>
            <label className="block mb-2">{t.diversity}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.training}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.safety}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.satisfaction}</label>
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
