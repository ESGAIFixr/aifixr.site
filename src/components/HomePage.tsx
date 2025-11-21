import { Search, TrendingUp, AlertCircle, FileText } from 'lucide-react';
import { useState } from 'react';

interface HomePageProps {
  language: 'ko' | 'en';
}

export function HomePage({ language }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const translations = {
    ko: {
      title: 'FIXER',
      searchPlaceholder: 'ESG 관련 검색어를 입력하세요',
      esgIssues: 'ESG 이슈 대시보드',
      disclosureStandards: '공시 기준 보기',
      recentIssues: '최근 ESG 이슈',
      environmentalRisks: '환경 리스크',
      socialResponsibility: '사회적 책임',
      governance: '지배구조',
    },
    en: {
      title: 'FIXER',
      searchPlaceholder: 'Enter ESG-related search terms',
      esgIssues: 'ESG Issues Dashboard',
      disclosureStandards: 'View Disclosure Standards',
      recentIssues: 'Recent ESG Issues',
      environmentalRisks: 'Environmental Risks',
      socialResponsibility: 'Social Responsibility',
      governance: 'Governance',
    },
  };

  const t = translations[language];

  const mockIssues = [
    {
      id: 1,
      category: 'E',
      title: language === 'ko' ? '탄소 배출 감축 목표' : 'Carbon Emission Reduction Target',
      description: language === 'ko' 
        ? '2030년까지 탄소 배출량 50% 감축 계획' 
        : 'Plan to reduce carbon emissions by 50% by 2030',
      trend: 'up',
    },
    {
      id: 2,
      category: 'S',
      title: language === 'ko' ? '직원 다양성 증진' : 'Employee Diversity Enhancement',
      description: language === 'ko'
        ? '여성 임원 비율 30% 달성 목표'
        : 'Target to achieve 30% female executives',
      trend: 'up',
    },
    {
      id: 3,
      category: 'G',
      title: language === 'ko' ? '이사회 독립성 강화' : 'Board Independence Enhancement',
      description: language === 'ko'
        ? '사외이사 비율 확대 및 전문성 강화'
        : 'Expand outside director ratio and strengthen expertise',
      trend: 'stable',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-lime-700 mb-8">{t.title}</h1>
        
        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lime-600 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 border-2 border-lime-300 rounded-xl focus:outline-none focus:border-lime-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* ESG Issues Dashboard */}
      <div className="mb-12">
        <h2 className="mb-6 text-lime-700">{t.esgIssues}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border-2 border-lime-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full ${
                    issue.category === 'E'
                      ? 'bg-green-100 text-green-700'
                      : issue.category === 'S'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {issue.category}
                </span>
                {issue.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-lime-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <h3 className="mb-2">{issue.title}</h3>
              <p className="text-gray-600">{issue.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclosure Standards Link */}
      <div className="text-center">
        <a
          href="#disclosure-standards"
          onClick={(e) => {
            e.preventDefault();
            // This would navigate to the disclosure standards page
          }}
          className="inline-flex items-center gap-2 text-lime-700 hover:text-lime-800 transition-colors"
        >
          <FileText className="w-5 h-5" />
          <span className="underline">{t.disclosureStandards}</span>
        </a>
      </div>
    </div>
  );
}
