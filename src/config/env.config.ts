/**
 * 환경 변수 설정 및 검증
 */

/**
 * 환경 변수 타입 정의
 */
interface EnvConfig {
  NEXT_PUBLIC_API_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_NAME?: string;
}

/**
 * 환경 변수 가져오기 및 검증
 */
export function getEnvConfig(): EnvConfig {
  const config: EnvConfig = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  };

  // 필수 환경 변수 검증
  if (!config.NEXT_PUBLIC_API_URL) {
    console.warn('NEXT_PUBLIC_API_URL is not set, using default: http://localhost:8080');
  }

  return config;
}

/**
 * 환경 변수 인스턴스
 */
export const env = getEnvConfig();

/**
 * 개발 환경 여부
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * 프로덕션 환경 여부
 */
export const isProduction = env.NODE_ENV === 'production';

