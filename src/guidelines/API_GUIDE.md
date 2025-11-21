# API 사용 가이드

## 📋 목차
1. [API 클라이언트 사용법](#api-클라이언트-사용법)
2. [API Routes](#api-routes)
3. [에러 처리](#에러-처리)
4. [타입 안정성](#타입-안정성)
5. [예시](#예시)

## API 클라이언트 사용법

### 기본 사용법
```tsx
import { apiClient } from '@/lib/api-client';

// GET 요청
const data = await apiClient.get('/api/soccer/search', {
  params: { keyword: '손흥민' }
});

// POST 요청
const result = await apiClient.post('/api/esg/report', {
  title: '보고서 제목',
  content: '내용'
});
```

### 타입 안전한 요청
```tsx
interface SearchResponse {
  code: number;
  message: string;
  data: any;
}

const response = await apiClient.get<SearchResponse>('/api/soccer/search', {
  params: { keyword: 'test' }
});
```

## API Routes

### Next.js API Route 생성
```tsx
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  return NextResponse.json({
    message: 'Success',
    data: query,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Data received',
    data: body,
  });
}
```

### API Route 사용
```tsx
// 클라이언트에서 호출
const response = await fetch('/api/example?query=test');
const data = await response.json();
```

## 에러 처리

### try-catch 패턴
```tsx
import { apiClient } from '@/lib/api-client';

async function fetchData() {
  try {
    const data = await apiClient.get('/api/data');
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: 'Failed to fetch data' };
  }
}
```

### 커스텀 에러 처리
```tsx
import { AxiosError } from 'axios';
import { apiClient } from '@/lib/api-client';

async function fetchData() {
  try {
    const data = await apiClient.get('/api/data');
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // 서버 응답이 있는 경우
        console.error('Server Error:', error.response.status);
      } else if (error.request) {
        // 요청은 보냈지만 응답이 없는 경우
        console.error('Network Error');
      }
    }
    throw error;
  }
}
```

## 타입 안정성

### API 응답 타입 정의
```tsx
// types/api.ts
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface SearchResult {
  id: string;
  name: string;
  description: string;
}
```

### 타입 안전한 API 호출
```tsx
import { apiClient } from '@/lib/api-client';
import type { ApiResponse, SearchResult } from '@/types/api';

async function search(keyword: string): Promise<SearchResult[]> {
  const response = await apiClient.get<ApiResponse<SearchResult[]>>(
    '/api/search',
    { params: { keyword } }
  );
  return response.data;
}
```

## 예시

### 완전한 예시
```tsx
"use client";

import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api';

interface SearchData {
  id: string;
  name: string;
}

export function SearchComponent() {
  const [results, setResults] = useState<SearchData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (keyword: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<ApiResponse<SearchData[]>>(
        '/api/search',
        { params: { keyword } }
      );
      setResults(response.data);
    } catch (err) {
      setError('검색 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 검색 UI */}
    </div>
  );
}
```

## ✅ 체크리스트

API를 사용할 때 확인할 사항:

- [ ] `apiClient`를 사용하여 요청을 보내는가?
- [ ] 적절한 타입을 지정했는가?
- [ ] 에러 처리를 구현했는가?
- [ ] 로딩 상태를 관리하는가?
- [ ] 타임아웃을 고려했는가?

