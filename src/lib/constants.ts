/**
 * 애플리케이션 상수 정의
 */

// API 엔드포인트
export const API_ENDPOINTS = {
  SOCCER: {
    SEARCH: '/api/soccer/search',
    PLAYER: '/api/soccer/player',
  },
  ESG: {
    REPORT: '/api/esg/report',
    DATA: '/api/esg/data',
  },
} as const;

// 페이지 경로
export const ROUTES = {
  HOME: '/',
  SOCCER: '/soccer',
  ESG_REPORT: '/esg/report',
} as const;

// 환경 변수 기본값
export const DEFAULT_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  API_TIMEOUT: 10000,
} as const;

// 언어 설정
export const LANGUAGES = {
  KO: 'ko',
  EN: 'en',
} as const;

// 페이지 상태
export const PAGE_STATES = {
  HOME: 'home',
  REPORT_CREATE: 'report-create',
  REPORT_PROOFREAD: 'report-proofread',
  COMPANY_DATA: 'company-data',
  E_DATA: 'e-data',
  S_DATA: 's-data',
  G_DATA: 'g-data',
  DIAGNOSIS_TOTAL: 'diagnosis-total',
  DIAGNOSIS_ENVIRONMENT: 'diagnosis-environment',
  DIAGNOSIS_SOCIAL: 'diagnosis-social',
  DIAGNOSIS_GOVERNANCE: 'diagnosis-governance',
  ESG_RATING: 'esg-rating',
  DISCLOSURE_STANDARDS: 'disclosure-standards',
} as const;

