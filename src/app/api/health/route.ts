import { NextResponse } from 'next/server';

/**
 * Health Check API Route
 * GET /api/health
 * 서버 상태 확인용 엔드포인트
 */
export async function GET() {
  try {
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'frontend',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
      },
      { status: 500 }
    );
  }
}

