# 컴포넌트 개발 가이드

## 📋 목차
1. [컴포넌트 구조](#컴포넌트-구조)
2. [Props 타입 정의](#props-타입-정의)
3. [재사용 가능한 컴포넌트](#재사용-가능한-컴포넌트)
4. [네이밍 규칙](#네이밍-규칙)
5. [예시](#예시)

## 컴포넌트 구조

### 기본 구조
```tsx
"use client"; // 클라이언트 컴포넌트인 경우

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props 타입 정의
}

export function Component({ ...props }: ComponentProps) {
  // 컴포넌트 로직
  return (
    // JSX
  );
}
```

### 폴더 구조
```
components/
├── ui/              # 기본 UI 컴포넌트 (shadcn/ui)
├── pages/           # 페이지별 컴포넌트
├── Header.tsx       # 공통 컴포넌트
└── Sidebar.tsx      # 공통 컴포넌트
```

## Props 타입 정의

### 필수 Props와 선택적 Props 구분
```tsx
interface ButtonProps {
  // 필수 Props
  label: string;
  onClick: () => void;
  
  // 선택적 Props
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}
```

### Props 기본값 설정
```tsx
export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  className,
}: ButtonProps) {
  // ...
}
```

## 재사용 가능한 컴포넌트

### 1. 단일 책임 원칙
- 하나의 컴포넌트는 하나의 역할만 수행
- 너무 많은 책임을 가진 컴포넌트는 분리

### 2. Props를 통한 커스터마이징
```tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  className?: string;
}

export function Card({ title, children, variant = 'default', className }: CardProps) {
  return (
    <div className={cn(
      'rounded-lg p-4',
      variant === 'outlined' && 'border border-gray-200',
      variant === 'elevated' && 'shadow-lg',
      className
    )}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
```

### 3. 컴포지션 패턴
```tsx
// 부모 컴포넌트
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

// 자식 컴포넌트
Card.Header = function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
};

Card.Body = function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
};

// 사용 예시
<Card>
  <Card.Header>제목</Card.Header>
  <Card.Body>내용</Card.Body>
</Card>
```

## 네이밍 규칙

### 컴포넌트 파일명
- **PascalCase** 사용: `Button.tsx`, `UserProfile.tsx`
- 폴더명과 파일명 일치: `Button/Button.tsx` 또는 `Button.tsx`

### Props 인터페이스명
- 컴포넌트명 + `Props`: `ButtonProps`, `UserProfileProps`

### 함수 컴포넌트명
- 컴포넌트 파일명과 동일: `export function Button() {}`

## 예시

### 완전한 예시
```tsx
"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  initialValue?: number;
  step?: number;
  className?: string;
  onCountChange?: (count: number) => void;
}

export function Counter({
  initialValue = 0,
  step = 1,
  className,
  onCountChange,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <button
        onClick={decrement}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        -
      </button>
      <span className="text-lg font-semibold">{count}</span>
      <button
        onClick={increment}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        +
      </button>
    </div>
  );
}
```

## ✅ 체크리스트

새 컴포넌트를 만들 때 확인할 사항:

- [ ] Props 타입이 명확하게 정의되어 있는가?
- [ ] 필수 Props와 선택적 Props가 구분되어 있는가?
- [ ] `cn()` 유틸리티를 사용하여 className을 병합하는가?
- [ ] 컴포넌트가 단일 책임을 가지고 있는가?
- [ ] 재사용 가능한가?
- [ ] 적절한 네이밍 규칙을 따르는가?

