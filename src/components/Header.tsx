import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  language: 'ko' | 'en';
  setLanguage: (lang: 'ko' | 'en') => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const menuItems = {
  ko: [
    {
      id: 'report',
      label: '보고서',
      subItems: [
        { id: 'report-create', label: '보고서 작성' },
        { id: 'report-proofread', label: '보고서 윤문' },
      ],
    },
    {
      id: 'data',
      label: '데이터 입력',
      subItems: [
        { id: 'company-data', label: '회사정보데이터' },
        { id: 'e-data', label: 'E 데이터' },
        { id: 's-data', label: 'S 데이터' },
        { id: 'g-data', label: 'G 데이터' },
      ],
    },
    {
      id: 'diagnosis',
      label: '자가진단화면',
      subItems: [
        { id: 'diagnosis-total', label: 'Total' },
        { id: 'diagnosis-environment', label: 'Environment' },
        { id: 'diagnosis-social', label: 'Social' },
        { id: 'diagnosis-governance', label: 'Governance' },
      ],
    },
    {
      id: 'esg-rating',
      label: 'ESG등급확인',
      subItems: [],
    },
  ],
  en: [
    {
      id: 'report',
      label: 'Report',
      subItems: [
        { id: 'report-create', label: 'Create Report' },
        { id: 'report-proofread', label: 'Proofread Report' },
      ],
    },
    {
      id: 'data',
      label: 'Data Input',
      subItems: [
        { id: 'company-data', label: 'Company Data' },
        { id: 'e-data', label: 'E Data' },
        { id: 's-data', label: 'S Data' },
        { id: 'g-data', label: 'G Data' },
      ],
    },
    {
      id: 'diagnosis',
      label: 'Self-Diagnosis',
      subItems: [
        { id: 'diagnosis-total', label: 'Total' },
        { id: 'diagnosis-environment', label: 'Environment' },
        { id: 'diagnosis-social', label: 'Social' },
        { id: 'diagnosis-governance', label: 'Governance' },
      ],
    },
    {
      id: 'esg-rating',
      label: 'ESG Rating',
      subItems: [],
    },
  ],
};

export function Header({ language, setLanguage, isLoggedIn, onLogin, onLogout, currentPage, setCurrentPage }: HeaderProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleMenuClick = (menuId: string, subItems: any[]) => {
    if (subItems.length > 0) {
      setCurrentPage(subItems[0].id);
    } else {
      setCurrentPage(menuId);
    }
  };

  return (
    <header className="bg-white border-b border-lime-200 shadow-sm sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <span className="text-lime-700">AIFIXR</span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 flex justify-center gap-8">
            {menuItems[language].map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  onClick={() => handleMenuClick(item.id, item.subItems)}
                  className="flex items-center gap-1 px-4 py-2 hover:text-lime-600 transition-colors"
                >
                  {item.label}
                  {item.subItems.length > 0 && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Dropdown */}
                {item.subItems.length > 0 && hoveredMenu === item.id && (
                  <div className="absolute top-full left-0 mt-0 bg-white border border-lime-200 rounded-lg shadow-lg py-2 min-w-[180px]">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => {
                          setCurrentPage(subItem.id);
                          setHoveredMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-lime-50 transition-colors"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Language & Login */}
          <div className="flex items-center gap-4">
            {/* Soccer Button */}
            <Link
              href="/soccer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {language === 'ko' ? 'Soccer' : 'Soccer'}
            </Link>
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 border border-lime-300 rounded-lg hover:bg-lime-50 transition-colors"
              >
                <span>{language === 'ko' ? '한국어' : 'English'}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {languageDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-lime-200 rounded-lg shadow-lg py-1 min-w-[120px]">
                  <button
                    onClick={() => {
                      setLanguage('ko');
                      setLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-lime-50 transition-colors"
                  >
                    한국어
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-lime-50 transition-colors"
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Login/Logout Button */}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
              >
                {language === 'ko' ? '로그아웃' : 'Logout'}
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="px-6 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
              >
                {language === 'ko' ? '로그인' : 'Login'}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
