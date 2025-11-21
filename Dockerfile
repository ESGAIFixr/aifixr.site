# 빌드 단계
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# package.json과 pnpm-lock.yaml 먼저 복사
COPY package.json pnpm-lock.yaml ./

# pnpm 설정 (hoisted 모드로 symlink 문제 해결)
RUN echo "node-linker=hoisted" > .npmrc

# 의존성 설치 (hoisted 모드로 재설치)
RUN pnpm install --frozen-lockfile || pnpm install

# 나머지 소스 코드 복사 (.dockerignore로 node_modules, .next 등 자동 제외)
COPY . .

# 설치 확인
RUN ls -la node_modules/.bin/next || echo "Next.js not found in .bin"
RUN test -f node_modules/next/dist/bin/next && echo "Next.js binary found" || (echo "Next.js binary not found" && find node_modules -name "next" -type f | head -5)

# Next.js 빌드
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# standalone 디렉토리 확인
RUN ls -la .next/standalone || (echo "Standalone build failed" && exit 1)

# 프로덕션 실행 단계
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js 빌드 결과물 복사
COPY --from=builder /app/public ./public

# standalone 모드 사용 시
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]

