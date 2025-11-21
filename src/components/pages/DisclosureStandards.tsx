import { FileText, ExternalLink } from 'lucide-react';

interface DisclosureStandardsProps {
  language: 'ko' | 'en';
}

export function DisclosureStandards({ language }: DisclosureStandardsProps) {
  const translations = {
    ko: {
      title: '공시 기준',
      description: 'ESG 보고서 작성을 위한 주요 공시 기준을 확인합니다.',
    },
    en: {
      title: 'Disclosure Standards',
      description: 'View key disclosure standards for ESG reporting.',
    },
  };

  const t = translations[language];

  const standards = [
    {
      name: 'GRI Standards',
      description: language === 'ko' 
        ? '글로벌 보고 이니셔티브 기준' 
        : 'Global Reporting Initiative Standards',
      url: 'https://www.globalreporting.org/',
    },
    {
      name: 'SASB',
      description: language === 'ko'
        ? '지속가능성 회계 기준 위원회'
        : 'Sustainability Accounting Standards Board',
      url: 'https://www.sasb.org/',
    },
    {
      name: 'TCFD',
      description: language === 'ko'
        ? '기후변화 재무정보 공개 태스크포스'
        : 'Task Force on Climate-related Financial Disclosures',
      url: 'https://www.fsb-tcfd.org/',
    },
    {
      name: 'K-ESG',
      description: language === 'ko'
        ? '한국형 ESG 가이드라인'
        : 'Korean ESG Guidelines',
      url: '#',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="space-y-4">
        {standards.map((standard, index) => (
          <div
            key={index}
            className="bg-white border-2 border-lime-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-2">{standard.name}</h3>
                <p className="text-gray-600">{standard.description}</p>
              </div>
              <a
                href={standard.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-700 hover:text-lime-800 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
