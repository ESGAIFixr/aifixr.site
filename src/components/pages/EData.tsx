import { Leaf } from 'lucide-react';

interface EDataProps {
  language: 'ko' | 'en';
}

export function EData({ language }: EDataProps) {
  const translations = {
    ko: {
      title: 'E 데이터 (환경)',
      description: '환경 관련 데이터를 입력합니다.',
      carbonEmission: '탄소 배출량 (tCO2e)',
      energyUsage: '에너지 사용량 (MWh)',
      waterUsage: '용수 사용량 (m³)',
      wasteGeneration: '폐기물 발생량 (톤)',
    },
    en: {
      title: 'E Data (Environment)',
      description: 'Enter environmental data.',
      carbonEmission: 'Carbon Emissions (tCO2e)',
      energyUsage: 'Energy Usage (MWh)',
      waterUsage: 'Water Usage (m³)',
      wasteGeneration: 'Waste Generation (tons)',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2">{t.carbonEmission}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.energyUsage}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.waterUsage}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.wasteGeneration}</label>
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
