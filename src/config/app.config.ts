/**
 * 애플리케이션 설정
 */

export const appConfig = {
  // API 설정
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    timeout: 10000,
  },

  // 앱 정보
  app: {
    name: 'ESG Report Automation App',
    version: '0.1.0',
    description: 'ESG 보고서 자동화 애플리케이션',
  },

  // 기능 플래그
  features: {
    enableChatbot: true,
    enableRealtime: true,
    enableESGReport: true,
  },

  // 언어 설정
  i18n: {
    defaultLanguage: 'ko',
    supportedLanguages: ['ko', 'en'] as const,
  },

  // 페이지 설정
  pages: {
    maxHistoryLength: 100,
    itemsPerPage: 20,
  },
} as const;

export type AppConfig = typeof appConfig;

