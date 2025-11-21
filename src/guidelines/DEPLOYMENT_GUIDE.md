# 배포 가이드

## 📋 목차
1. [빌드 프로세스](#빌드-프로세스)
2. [환경 변수 관리](#환경-변수-관리)
3. [Docker 설정](#docker-설정)
4. [배포 체크리스트](#배포-체크리스트)

## 빌드 프로세스

### 로컬 빌드
```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

### Docker 빌드
```bash
# Docker 이미지 빌드
docker build -t frontend:latest .

# 컨테이너 실행
docker run -p 3000:3000 frontend:latest
```

## 환경 변수 관리

### 환경 변수 파일
```bash
# .env.local (로컬 개발)
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=development

# .env.production (프로덕션)
NEXT_PUBLIC_API_URL=http://discovery:8080
NODE_ENV=production
```

### 환경 변수 사용
```tsx
// 클라이언트에서 사용 가능 (NEXT_PUBLIC_ 접두사 필요)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 서버에서만 사용 가능
const secretKey = process.env.SECRET_KEY;
```

## Docker 설정

### Dockerfile 구조
```dockerfile
# 의존성 설치
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# 빌드
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 실행
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
CMD ["node", "server.js"]
```

## 배포 체크리스트

### 배포 전 확인 사항

- [ ] 환경 변수가 올바르게 설정되었는가?
- [ ] 빌드가 성공적으로 완료되는가?
- [ ] 모든 의존성이 설치되었는가?
- [ ] API 엔드포인트가 올바른가?
- [ ] Docker 이미지가 정상적으로 빌드되는가?
- [ ] 프로덕션 모드에서 정상 작동하는가?

### 배포 후 확인 사항

- [ ] 애플리케이션이 정상적으로 실행되는가?
- [ ] API 연결이 정상인가?
- [ ] 에러 로그가 없는가?
- [ ] 성능이 적절한가?

