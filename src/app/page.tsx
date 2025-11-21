"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { HomePage } from '@/components/HomePage';
import { ReportCreate } from '@/components/pages/ReportCreate';
import { ReportProofread } from '@/components/pages/ReportProofread';
import { CompanyData } from '@/components/pages/CompanyData';
import { EData } from '@/components/pages/EData';
import { SData } from '@/components/pages/SData';
import { GData } from '@/components/pages/GData';
import { DiagnosisTotal } from '@/components/pages/DiagnosisTotal';
import { DiagnosisEnvironment } from '@/components/pages/DiagnosisEnvironment';
import { DiagnosisSocial } from '@/components/pages/DiagnosisSocial';
import { DiagnosisGovernance } from '@/components/pages/DiagnosisGovernance';
import { ESGRating } from '@/components/pages/ESGRating';
import { DisclosureStandards } from '@/components/pages/DisclosureStandards';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [language, setLanguage] = useState<'ko' | 'en'>('ko');
    const [currentPage, setCurrentPage] = useState('home');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('home');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage language={language} />;
            case 'report-create':
                return <ReportCreate language={language} />;
            case 'report-proofread':
                return <ReportProofread language={language} />;
            case 'company-data':
                return <CompanyData language={language} />;
            case 'e-data':
                return <EData language={language} />;
            case 's-data':
                return <SData language={language} />;
            case 'g-data':
                return <GData language={language} />;
            case 'diagnosis-total':
                return <DiagnosisTotal language={language} />;
            case 'diagnosis-environment':
                return <DiagnosisEnvironment language={language} />;
            case 'diagnosis-social':
                return <DiagnosisSocial language={language} />;
            case 'diagnosis-governance':
                return <DiagnosisGovernance language={language} />;
            case 'esg-rating':
                return <ESGRating language={language} />;
            case 'disclosure-standards':
                return <DisclosureStandards language={language} />;
            default:
                return <HomePage language={language} />;
        }
    };

    return (
        <div className="min-h-screen bg-lime-50">
            <Header
                language={language}
                setLanguage={setLanguage}
                isLoggedIn={isLoggedIn}
                onLogin={handleLogin}
                onLogout={handleLogout}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            <div className="flex">
                {isLoggedIn && (
                    <Sidebar
                        language={language}
                        collapsed={sidebarCollapsed}
                        setCollapsed={setSidebarCollapsed}
                    />
                )}

                <main className={`flex-1 transition-all duration-300 ${isLoggedIn ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : ''
                    }`}>
                    {renderPage()}
                </main>
            </div>
        </div>
    );
}

