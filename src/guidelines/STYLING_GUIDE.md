# 스타일링 가이드

## 📋 목차
1. [Tailwind CSS 사용법](#tailwind-css-사용법)
2. [컴포넌트 스타일링](#컴포넌트-스타일링)
3. [반응형 디자인](#반응형-디자인)
4. [커스텀 스타일](#커스텀-스타일)

## Tailwind CSS 사용법

### 기본 사용
```tsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-900">제목</h1>
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    버튼
  </button>
</div>
```

### 조건부 스타일링
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  !isActive && 'bg-gray-200 text-gray-700',
  className
)}>
```

## 컴포넌트 스타일링

### Variant 패턴
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', className }: ButtonProps) {
  return (
    <button className={cn(
      'rounded font-medium transition-colors',
      // Variant 스타일
      variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
      variant === 'secondary' && 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
      // Size 스타일
      size === 'sm' && 'px-2 py-1 text-sm',
      size === 'md' && 'px-4 py-2 text-base',
      size === 'lg' && 'px-6 py-3 text-lg',
      className
    )}>
      버튼
    </button>
  );
}
```

## 반응형 디자인

### Breakpoint 사용
```tsx
<div className="
  grid
  grid-cols-1        // 모바일: 1열
  md:grid-cols-2     // 태블릿: 2열
  lg:grid-cols-3     // 데스크톱: 3열
  gap-4
">
  {/* 컨텐츠 */}
</div>
```

### 반응형 텍스트
```tsx
<h1 className="
  text-xl           // 모바일
  md:text-2xl        // 태블릿
  lg:text-4xl        // 데스크톱
  font-bold
">
  제목
</h1>
```

## 커스텀 스타일

### globals.css에 추가
```css
/* globals.css */
@layer utilities {
  .custom-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
}
```

### CSS 변수 사용
```tsx
<div style={{ 
  '--primary-color': '#3b82f6',
  backgroundColor: 'var(--primary-color)'
}}>
```

## ✅ 체크리스트

스타일링할 때 확인할 사항:

- [ ] Tailwind CSS 클래스를 사용하는가?
- [ ] `cn()` 유틸리티로 클래스를 병합하는가?
- [ ] 반응형 디자인을 고려했는가?
- [ ] 접근성을 고려했는가? (색상 대비, 포커스 상태 등)

