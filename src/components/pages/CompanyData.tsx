import { Building2 } from 'lucide-react';

interface CompanyDataProps {
  language: 'ko' | 'en';
}

export function CompanyData({ language }: CompanyDataProps) {
  const translations = {
    ko: {
      title: '회사정보데이터',
      description: '기업의 기본 정보를 입력합니다.',
      companyName: '회사명',
      industry: '업종',
      employees: '직원 수',
      revenue: '매출액',
    },
    en: {
      title: 'Company Data',
      description: 'Enter basic company information.',
      companyName: 'Company Name',
      industry: 'Industry',
      employees: 'Number of Employees',
      revenue: 'Revenue',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2">{t.companyName}</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.industry}</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.employees}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>

          <div>
            <label className="block mb-2">{t.revenue}</label>
            <input
              type="text"
              className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
