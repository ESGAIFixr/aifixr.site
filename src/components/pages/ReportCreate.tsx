import { FileText, Download } from 'lucide-react';

interface ReportCreateProps {
  language: 'ko' | 'en';
}

export function ReportCreate({ language }: ReportCreateProps) {
  const translations = {
    ko: {
      title: '보고서 작성',
      description: 'ESG 보고서를 자동으로 생성합니다.',
      selectYear: '보고 연도 선택',
      selectFormat: '보고서 형식 선택',
      generate: '보고서 생성',
    },
    en: {
      title: 'Create Report',
      description: 'Automatically generate ESG reports.',
      selectYear: 'Select Reporting Year',
      selectFormat: 'Select Report Format',
      generate: 'Generate Report',
    },
  };

  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-lime-700" />
        <h1 className="text-lime-700">{t.title}</h1>
      </div>
      
      <p className="text-gray-600 mb-8">{t.description}</p>

      <div className="bg-white border-2 border-lime-200 rounded-xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2">{t.selectYear}</label>
            <select className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">{t.selectFormat}</label>
            <select className="w-full px-4 py-3 border-2 border-lime-200 rounded-lg focus:outline-none focus:border-lime-500">
              <option>GRI Standards</option>
              <option>SASB</option>
              <option>TCFD</option>
              <option>K-ESG</option>
            </select>
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors">
            <Download className="w-5 h-5" />
            {t.generate}
          </button>
        </div>
      </div>
    </div>
  );
}
