- 251119 ys 전략 공유
    
    # Zustand 단일 스토어 전략
    
    **상태**: ✅ 승인됨
    
    **버전**: 1.0
    
    **최종 수정일**: 2024
    
    ---
    
    ## 1. 개요
    
    이 프로젝트는 **반드시 1개의 전역 스토어만** 사용하며, zustand를 상태 관리 라이브러리로 채택합니다. 스토어는 `src/store/` 디렉토리에 위치합니다.
    
    **핵심 원칙:**
    
    - ✅ **단일 스토어 절대 유지**: 하나의 스토어 인스턴스만 존재
    - ✅ **슬라이스 패턴**: 도메인별로 슬라이스 분리
    - ✅ **확장 가능성**: 에이전트 추가 시 슬라이스만 추가하면 됨
    - ✅ **비즈니스 로직 분리**: AI/LLM 관련 로직은 `lib/ai/`에 위치
    
    **구현 대상:**
    
    - 6개의 에이전트 슬라이스 (kESG, ESRS, GRI, Rewrite, Chatbot, Realtime)
    - 단일 스토어 인스턴스 (`src/store/index.ts`)
    - AI 로직 분리 (`src/lib/ai/`)
    
    ## 2. 설계 원칙
    
    ### 2.1 단일 스토어 원칙 (절대 규칙)
    
    - **하나의 중앙 집중식 스토어만 존재**: `src/store/index.ts`
    - 모든 전역 상태는 이 스토어에서 관리
    - 여러 도메인별 슬라이스(slice)로 분리하여 관리하되, 하나의 스토어 인스턴스로 통합
    - **절대적으로 단일 스토어 유지**: 여러 스토어 생성 금지
    
    ### 2.2 스토어 구조
    
    ```
    
    src/store/
    
    ├── index.ts          # 단일 스토어 인스턴스 (export)
    
    ├── types.ts          # 전역 타입 정의
    
    ├── slices/           # 도메인별 슬라이스
    
    │   ├── kESG.ts      # K-ESG 에이전트 슬라이스
    
    │   ├── esrs.ts      # ESRS 에이전트 슬라이스
    
    │   ├── gri.ts       # GRI 에이전트 슬라이스
    
    │   ├── rewrite.ts    # Rewrite 에이전트 슬라이스
    
    │   ├── chatbot.ts   # Chatbot 에이전트 슬라이스
    
    │   ├── realtime.ts  # Realtime 에이전트 슬라이스
    
    │   └── [future].ts   # 향후 추가될 에이전트 슬라이스
    
    └── middleware/       # 미들웨어 (persist, devtools 등)
    
        └── persist.ts
    
    ```
    
    ### 2.3 에이전트 슬라이스 구조
    
    - **6개의 에이전트 (현재 예상)**: 각 에이전트는 독립적인 슬라이스로 관리
    - `kESG`: K-ESG 관련 에이전트
    - `ESRS`: ESRS 관련 에이전트
    - `GRI`: GRI 관련 에이전트
    - `Rewrite`: 리라이팅 에이전트
    - `Chatbot`: 챗봇 에이전트
    - `Realtime`: 실시간 처리 에이전트
    - **확장 가능성**: 새로운 에이전트 추가 시 슬라이스만 추가하면 됨
    - 각 에이전트는 독립적인 상태와 액션을 가짐
    - 에이전트 간 상호작용이 필요한 경우 공통 상태나 이벤트 시스템 활용
    - **AI/LLM 로직 분리**: GPT/LLM 관련 비즈니스 로직은 `lib/ai/`에 위치 (스토어는 상태만 관리)
    
    ### 2.4 디렉토리 선택 이유
    
    - `src/store/`: 프로젝트 루트의 `src/` 디렉토리 내에서 상태 관리 코드 위치
    - `src/app/`: Next.js 라우팅 전용
    - `src/lib/`: 비즈니스 로직, AI/LLM 래퍼, 유틸리티
    - `src/components/`: UI 컴포넌트
    - `src/hooks/`: 커스텀 훅 (UI/상태 분리)
    
    ## 3. 구현 전략
    
    ### 3.1 스토어 생성 방식
    
    **방식 A: 슬라이스 패턴 (권장)**
    
    - 각 도메인별로 독립적인 슬라이스를 생성
    - 단일 스토어에서 모든 슬라이스를 통합
    - 타입 안정성과 코드 분리 유지
    - 확장성과 유지보수성 우수
    
    **방식 B: 단일 스토어 직접 정의**
    
    - 하나의 큰 스토어 객체에 모든 상태 정의
    - 간단하지만 확장성과 유지보수성 저하
    
    **→ 방식 A를 권장합니다.**
    
    ### 3.2 타입 정의
    
    ```tsx
    
    // src/store/types.ts
    
    // 에이전트 공통 인터페이스
    
    export interface AgentState {
    
      id: string;
    
      name: string;
    
      isActive: boolean;
    
      isLoading: boolean;
    
      error: string | null;
    
      lastResponse: any | null;
    
      conversationHistory: Array<{
    
        role: 'user' | 'assistant' | 'system';
    
        content: string;
    
        timestamp: number;
    
      }>;
    
    }
    
    export interface AgentActions {
    
      setActive: (active: boolean) => void;
    
      setLoading: (loading: boolean) => void;
    
      setError: (error: string | null) => void;
    
      addMessage: (role: 'user' | 'assistant' | 'system', content: string) => void;
    
      clearHistory: () => void;
    
      reset: () => void;
    
    }
    
    // 각 에이전트 슬라이스 (에이전트별 고유 상태 추가 가능)
    
    export interface KESGSlice extends AgentState, AgentActions {
    
      // K-ESG 전용 상태 및 액션
    
      currentReport: any | null;
    
      setCurrentReport: (report: any) => void;
    
      processKESGData: (data: any) => Promise<void>;
    
      // 추가 상태 및 액션...
    
    }
    
    export interface ESRSSlice extends AgentState, AgentActions {
    
      // ESRS 전용 상태 및 액션
    
      currentReport: any | null;
    
      setCurrentReport: (report: any) => void;
    
      processESRSData: (data: any) => Promise<void>;
    
      // 추가 상태 및 액션...
    
    }
    
    export interface GRISlice extends AgentState, AgentActions {
    
      // GRI 전용 상태 및 액션
    
      currentReport: any | null;
    
      setCurrentReport: (report: any) => void;
    
      processGRIData: (data: any) => Promise<void>;
    
      // 추가 상태 및 액션...
    
    }
    
    export interface RewriteSlice extends AgentState, AgentActions {
    
      // Rewrite 전용 상태 및 액션
    
      originalText: string | null;
    
      rewrittenText: string | null;
    
      rewriteOptions: any;
    
      rewriteText: (text: string, options?: any) => Promise<void>;
    
      // 추가 상태 및 액션...
    
    }
    
    export interface ChatbotSlice extends AgentState, AgentActions {
    
      // Chatbot 전용 상태 및 액션
    
      sessionId: string | null;
    
      sendMessage: (message: string) => Promise<void>;
    
      // 추가 상태 및 액션...
    
    }
    
    export interface RealtimeSlice extends AgentState, AgentActions {
    
      // Realtime 전용 상태 및 액션
    
      connectionStatus: 'connected' | 'disconnected' | 'connecting';
    
      lastUpdate: number | null;
    
      subscribe: (channel: string) => void;
    
      unsubscribe: (channel: string) => void;
    
      // 추가 상태 및 액션...
    
    }
    
    // 향후 추가될 에이전트를 위한 확장 가능한 구조
    
    // export interface NewAgentSlice extends AgentState, AgentActions {
    
    //   // 새 에이전트 전용 상태 및 액션
    
    // }
    
    export interface StoreState {
    
      kESG: KESGSlice;
    
      esrs: ESRSSlice;
    
      gri: GRISlice;
    
      rewrite: RewriteSlice;
    
      chatbot: ChatbotSlice;
    
      realtime: RealtimeSlice;
    
      // 향후 추가될 에이전트 슬라이스
    
      // newAgent: NewAgentSlice;
    
    }
    
    ```
    
    **참고:**
    
    - AI/LLM 관련 비즈니스 로직은 `lib/ai/`에 위치
    - 스토어는 상태 관리만 담당
    - 에이전트별 고유 로직은 각 슬라이스의 액션에서 `lib/ai/` 함수를 호출
    
    ### 3.3 에이전트 슬라이스 패턴 예시
    
    각 에이전트는 독립적인 슬라이스로 관리되며, 공통 인터페이스를 상속:
    
    ```tsx
    
    // src/store/slices/kESG.ts
    
    import { StateCreator } from 'zustand';
    
    import { StoreState, KESGSlice } from '../types';
    
    import { processKESGData } from '@/lib/ai/kESG'; // AI 로직은 lib/ai에 위치
    
    export const createKESGSlice: StateCreator<
    
      StoreState,
    
      [['zustand/immer', never]],
    
      [],
    
      KESGSlice
    
    > = (set, get) => ({
    
      id: 'kESG',
    
      name: 'K-ESG Agent',
    
      isActive: false,
    
      isLoading: false,
    
      error: null,
    
      lastResponse: null,
    
      conversationHistory: [],
    
      currentReport: null,
    
      setActive: (active: boolean) =>
    
        set((state) => {
    
          state.kESG.isActive = active;
    
        }),
    
      setLoading: (loading: boolean) =>
    
        set((state) => {
    
          state.kESG.isLoading = loading;
    
        }),
    
      setError: (error: string | null) =>
    
        set((state) => {
    
          state.kESG.error = error;
    
        }),
    
      addMessage: (role, content) =>
    
        set((state) => {
    
          state.kESG.conversationHistory.push({
    
            role,
    
            content,
    
            timestamp: Date.now(),
    
          });
    
        }),
    
      clearHistory: () =>
    
        set((state) => {
    
          state.kESG.conversationHistory = [];
    
        }),
    
      reset: () =>
    
        set((state) => {
    
          state.kESG.isActive = false;
    
          state.kESG.isLoading = false;
    
          state.kESG.error = null;
    
          state.kESG.lastResponse = null;
    
          state.kESG.conversationHistory = [];
    
          state.kESG.currentReport = null;
    
        }),
    
      setCurrentReport: (report: any) =>
    
        set((state) => {
    
          state.kESG.currentReport = report;
    
        }),
    
      processKESGData: async (data: any) => {
    
        set((state) => {
    
          state.kESG.isLoading = true;
    
          state.kESG.error = null;
    
        });
    
        try {
    
          // AI 로직은 lib/ai에서 호출
    
          const response = await processKESGData(data);
    
          set((state) => {
    
            state.kESG.lastResponse = response;
    
            state.kESG.isLoading = false;
    
            state.kESG.addMessage('assistant', JSON.stringify(response));
    
          });
    
        } catch (error: any) {
    
          set((state) => {
    
            state.kESG.error = error.message;
    
            state.kESG.isLoading = false;
    
          });
    
        }
    
      },
    
    });
    
    // src/store/slices/chatbot.ts 예시
    
    import { StateCreator } from 'zustand';
    
    import { StoreState, ChatbotSlice } from '../types';
    
    import { sendChatMessage } from '@/lib/ai/chatbot'; // AI 로직은 lib/ai에 위치
    
    export const createChatbotSlice: StateCreator<
    
      StoreState,
    
      [['zustand/immer', never]],
    
      [],
    
      ChatbotSlice
    
    > = (set, get) => ({
    
      id: 'chatbot',
    
      name: 'Chatbot Agent',
    
      isActive: false,
    
      isLoading: false,
    
      error: null,
    
      lastResponse: null,
    
      conversationHistory: [],
    
      sessionId: null,
    
      setActive: (active: boolean) =>
    
        set((state) => {
    
          state.chatbot.isActive = active;
    
        }),
    
      setLoading: (loading: boolean) =>
    
        set((state) => {
    
          state.chatbot.isLoading = loading;
    
        }),
    
      setError: (error: string | null) =>
    
        set((state) => {
    
          state.chatbot.error = error;
    
        }),
    
      addMessage: (role, content) =>
    
        set((state) => {
    
          state.chatbot.conversationHistory.push({
    
            role,
    
            content,
    
            timestamp: Date.now(),
    
          });
    
        }),
    
      clearHistory: () =>
    
        set((state) => {
    
          state.chatbot.conversationHistory = [];
    
        }),
    
      reset: () =>
    
        set((state) => {
    
          state.chatbot.isActive = false;
    
          state.chatbot.isLoading = false;
    
          state.chatbot.error = null;
    
          state.chatbot.lastResponse = null;
    
          state.chatbot.conversationHistory = [];
    
          state.chatbot.sessionId = null;
    
        }),
    
      sendMessage: async (message: string) => {
    
        set((state) => {
    
          state.chatbot.isLoading = true;
    
          state.chatbot.error = null;
    
          state.chatbot.conversationHistory.push({
    
            role: 'user',
    
            content: message,
    
            timestamp: Date.now(),
    
          });
    
        });
    
        try {
    
          // AI 로직은 lib/ai에서 호출
    
          const response = await sendChatMessage({
    
            message,
    
            sessionId: get().chatbot.sessionId,
    
            history: get().chatbot.conversationHistory,
    
          });
    
          set((state) => {
    
            state.chatbot.lastResponse = response;
    
            state.chatbot.isLoading = false;
    
            state.chatbot.sessionId = response.sessionId || state.chatbot.sessionId;
    
            state.chatbot.conversationHistory.push({
    
              role: 'assistant',
    
              content: response.content,
    
              timestamp: Date.now(),
    
            });
    
          });
    
        } catch (error: any) {
    
          set((state) => {
    
            state.chatbot.error = error.message;
    
            state.chatbot.isLoading = false;
    
          });
    
        }
    
      },
    
    });
    
    // src/store/index.ts
    
    import { create } from 'zustand';
    
    import { devtools } from 'zustand/middleware';
    
    import { immer } from 'zustand/middleware/immer';
    
    import { StoreState } from './types';
    
    import { createKESGSlice } from './slices/kESG';
    
    import { createESRSSlice } from './slices/esrs';
    
    import { createGRISlice } from './slices/gri';
    
    import { createRewriteSlice } from './slices/rewrite';
    
    import { createChatbotSlice } from './slices/chatbot';
    
    import { createRealtimeSlice } from './slices/realtime';
    
    // 향후 추가될 에이전트
    
    // import { createNewAgentSlice } from './slices/newAgent';
    
    export const useStore = create<StoreState>()(
    
      devtools(
    
        immer((...a) => ({
    
          kESG: createKESGSlice(...a),
    
          esrs: createESRSSlice(...a),
    
          gri: createGRISlice(...a),
    
          rewrite: createRewriteSlice(...a),
    
          chatbot: createChatbotSlice(...a),
    
          realtime: createRealtimeSlice(...a),
    
          // 향후 추가될 에이전트
    
          // newAgent: createNewAgentSlice(...a),
    
        })),
    
        { name: 'AppStore' }
    
      )
    
    );
    
    ```
    
    **더 간단한 통합 방식 (immer 미들웨어 없이):**
    
    ```tsx
    
    // src/store/index.ts
    
    import { create } from 'zustand';
    
    import { devtools } from 'zustand/middleware';
    
    import { StoreState } from './types';
    
    import { createKESGSlice } from './slices/kESG';
    
    import { createESRSSlice } from './slices/esrs';
    
    import { createGRISlice } from './slices/gri';
    
    import { createRewriteSlice } from './slices/rewrite';
    
    import { createChatbotSlice } from './slices/chatbot';
    
    import { createRealtimeSlice } from './slices/realtime';
    
    export const useStore = create<StoreState>()(
    
      devtools(
    
        (set, get) => ({
    
          kESG: createKESGSlice(set, get),
    
          esrs: createESRSSlice(set, get),
    
          gri: createGRISlice(set, get),
    
          rewrite: createRewriteSlice(set, get),
    
          chatbot: createChatbotSlice(set, get),
    
          realtime: createRealtimeSlice(set, get),
    
        }),
    
        { name: 'AppStore' }
    
      )
    
    );
    
    ```
    
    ## 4. 사용 가이드
    
    ### 4.1 컴포넌트에서 사용
    
    ```tsx
    
    // src/app/page.tsx 또는 src/app/(routes)/k-esg/page.tsx
    
    'use client';
    
    import { useStore } from '@/store';
    
    export default function KESGPage() {
    
      // ❌ 전체 스토어 사용 (비권장 - 성능 이슈)
    
      // const store = useStore();
    
      // ✅ K-ESG 에이전트 사용 예시
    
      const kESG = useStore((state) => state.kESG);
    
      const kESGIsActive = useStore((state) => state.kESG.isActive);
    
      const kESGProcessData = useStore((state) => state.kESG.processKESGData);
    
      // ✅ Chatbot 에이전트 사용 예시
    
      const chatbot = useStore((state) => state.chatbot);
    
      const chatbotSendMessage = useStore((state) => state.chatbot.sendMessage);
    
      const chatbotIsLoading = useStore((state) => state.chatbot.isLoading);
    
      // ✅ 여러 에이전트 상태를 한 번에 선택
    
      const { kESG, esrs, gri } = useStore((state) => ({
    
        kESG: state.kESG,
    
        esrs: state.esrs,
    
        gri: state.gri,
    
      }));
    
      // ✅ Rewrite 에이전트 사용
    
      const rewriteText = useStore((state) => state.rewrite.rewriteText);
    
      const rewrittenText = useStore((state) => state.rewrite.rewrittenText);
    
      const handleKESGProcess = async (data: any) => {
    
        await kESGProcessData(data);
    
      };
    
      const handleChatbotSend = async (message: string) => {
    
        await chatbotSendMessage(message);
    
      };
    
      return (
    
        // ... JSX
    
      );
    
    }
    
    ```
    
    ### 4.2 여러 상태를 한 번에 선택 (shallow 비교)
    
    ```tsx
    
    import { useShallow } from 'zustand/react/shallow';
    
    const { kESG, esrs, gri } = useStore(
    
      useShallow((state) => ({
    
        kESG: state.kESG,
    
        esrs: state.esrs,
    
        gri: state.gri,
    
      }))
    
    );
    
    ```
    
    ### 4.3 커스텀 훅으로 분리
    
    ```tsx
    
    // src/hooks/useKESG.ts
    
    import { useStore } from '@/store';
    
    export const useKESG = () => {
    
      const kESG = useStore((state) => state.kESG);
    
      const isActive = useStore((state) => state.kESG.isActive);
    
      const isLoading = useStore((state) => state.kESG.isLoading);
    
      const error = useStore((state) => state.kESG.error);
    
      const processKESGData = useStore((state) => state.kESG.processKESGData);
    
      const setActive = useStore((state) => state.kESG.setActive);
    
      const reset = useStore((state) => state.kESG.reset);
    
      return {
    
        ...kESG,
    
        isActive,
    
        isLoading,
    
        error,
    
        processKESGData,
    
        setActive,
    
        reset,
    
      };
    
    };
    
    // src/hooks/useChatbot.ts
    
    import { useStore } from '@/store';
    
    export const useChatbot = () => {
    
      const chatbot = useStore((state) => state.chatbot);
    
      const isLoading = useStore((state) => state.chatbot.isLoading);
    
      const sendMessage = useStore((state) => state.chatbot.sendMessage);
    
      const clearHistory = useStore((state) => state.chatbot.clearHistory);
    
      return {
    
        ...chatbot,
    
        isLoading,
    
        sendMessage,
    
        clearHistory,
    
      };
    
    };
    
    // src/hooks/useRewrite.ts
    
    import { useStore } from '@/store';
    
    export const useRewrite = () => {
    
      const rewrite = useStore((state) => state.rewrite);
    
      const rewriteText = useStore((state) => state.rewrite.rewriteText);
    
      const rewrittenText = useStore((state) => state.rewrite.rewrittenText);
    
      const isLoading = useStore((state) => state.rewrite.isLoading);
    
      return {
    
        ...rewrite,
    
        rewriteText,
    
        rewrittenText,
    
        isLoading,
    
      };
    
    };
    
    // src/app/(routes)/k-esg/page.tsx에서 사용
    
    import { useKESG } from '@/hooks/useKESG';
    
    import { useChatbot } from '@/hooks/useChatbot';
    
    export default function KESGPage() {
    
      const kESG = useKESG();
    
      const chatbot = useChatbot();
    
      // ... 컴포넌트 로직
    
    }
    
    ```
    
    ## 5. 마이그레이션 전략
    
    ### 5.1 기존 코드 마이그레이션
    
    현재 `app/page.tsx`에서 사용 중인 로컬 상태를 스토어로 이동:
    
    1. **1단계**: zustand 설치
    
    ```bash
    
    pnpm add zustand
    
    ```
    
    1. **2단계**: 스토어 구조 생성
    - `src/store/` 디렉토리 생성
    - `src/store/types.ts` 생성
    - `src/store/index.ts` 생성
    - `src/store/slices/` 디렉토리 생성
    1. **3단계**: 에이전트 슬라이스 구현 (우선순위에 따라)
    - `src/store/slices/kESG.ts` 생성
    - `src/store/slices/esrs.ts` 생성
    - `src/store/slices/gri.ts` 생성
    - `src/store/slices/rewrite.ts` 생성
    - `src/store/slices/chatbot.ts` 생성
    - `src/store/slices/realtime.ts` 생성
    - 각 슬라이스는 `lib/ai/`의 함수를 호출하여 비즈니스 로직 처리
    1. **4단계**: 컴포넌트 마이그레이션
    - 각 라우트의 `page.tsx`에서 `useState` 제거
    - `useStore` 훅으로 교체
    - 상태와 액션을 스토어에서 가져오도록 수정
    1. **5단계**: 테스트 및 검증
    - 기능 동작 확인
    - 성능 최적화 확인 (불필요한 리렌더링 방지)
    
    ## 6. 규칙 및 제약사항
    
    ### 6.1 필수 규칙
    
    - ✅ **단일 스토어 절대 유지**: `src/store/index.ts`에서 export하는 `useStore`만 사용
    - ✅ **슬라이스 패턴 사용**: 도메인별로 슬라이스 분리하여 관리
    - ✅ **타입 안정성**: TypeScript로 모든 상태와 액션 타입 정의
    - ✅ **선택적 구독**: 컴포넌트는 필요한 상태만 선택적으로 구독
    - ✅ **명명 규칙**: 슬라이스는 에이전트명으로 명명 (예: `kESG`, `esrs`, `gri`)
    - ✅ **위치 규칙**: 스토어는 반드시 `src/store/` 디렉토리에만 위치
    - ✅ **비즈니스 로직 분리**: AI/LLM 로직은 `lib/ai/`에 위치, 스토어는 상태만 관리
    
    ### 6.2 금지 사항
    
    - ❌ **여러 개의 독립적인 스토어 생성 절대 금지** (단일 스토어 원칙)
    - ❌ 컴포넌트 내부에서 `create()` 호출 금지
    - ❌ 전역 상태가 아닌 로컬 상태를 스토어에 저장 금지
    - ❌ 불필요한 리렌더링 유발하는 전체 스토어 구독 금지
    - ❌ `src/store/` 외부에서 스토어 인스턴스 생성 금지
    - ❌ 스토어 슬라이스 내에서 직접 AI/LLM API 호출 금지 (lib/ai를 통해 호출)
    
    ### 6.3 디렉토리 구조 규칙
    
    - ✅ 스토어는 `src/store/`에만 위치
    - ✅ 라우팅 파일: `src/app/`, `src/app/(routes)/` 등
    - ✅ 상태 관리: `src/store/` 디렉토리
    - ✅ 비즈니스 로직: `src/lib/ai/` 디렉토리
    - ✅ 커스텀 훅: `src/hooks/` 디렉토리
    - ✅ UI 컴포넌트: `src/components/` 디렉토리
    
    ## 7. 확장성 고려사항
    
    ### 7.1 미들웨어 추가
    
    **Persist 미들웨어 (로컬 스토리지 연동)**
    
    ```tsx
    
    // app/store/middleware/persist.ts
    
    import { persist, createJSONStorage } from 'zustand/middleware';
    
    export const persistConfig = {
    
      name: 'app-storage',
    
      storage: createJSONStorage(() => localStorage),
    
      partialize: (state: StoreState) => ({
    
        user: state.user, // user 슬라이스만 persist
    
      }),
    
    };
    
    // app/store/index.ts에서 사용
    
    import { persistConfig } from './middleware/persist';
    
    export const useStore = create<StoreState>()(
    
      devtools(
    
        persist(
    
          (set, get) => ({
    
            // ... slices
    
          }),
    
          persistConfig
    
        ),
    
        { name: 'AppStore' }
    
      )
    
    );
    
    ```
    
    **DevTools 미들웨어 (개발 환경)**
    
    ```tsx
    
    // app/store/index.ts
    
    import { devtools } from 'zustand/middleware';
    
    export const useStore = create<StoreState>()(
    
      devtools(
    
        (set, get) => ({
    
          // ... slices
    
        }),
    
        {
    
          name: 'AppStore',
    
          enabled: process.env.NODE_ENV === 'development'
    
        }
    
      )
    
    );
    
    ```
    
    **Immer 미들웨어 (불변성 관리)**
    
    ```tsx
    
    // app/store/index.ts
    
    import { immer } from 'zustand/middleware/immer';
    
    export const useStore = create<StoreState>()(
    
      devtools(
    
        immer((set, get) => ({
    
          // ... slices
    
        })),
    
        { name: 'AppStore' }
    
      )
    
    );
    
    ```
    
    ### 7.2 성능 최적화
    
    - **shallow 비교**: `useShallow` 훅 사용으로 객체 비교 최적화
    - **선택적 구독**: 필요한 상태만 구독하여 불필요한 리렌더링 방지
    - **메모이제이션**: 복잡한 선택자 함수는 `useMemo`로 메모이제이션
    - **액션 분리**: 상태와 액션을 분리하여 액션만 필요한 컴포넌트 최적화
    - **커스텀 훅**: 자주 사용하는 상태 조합을 커스텀 훅으로 분리
    
    ### 7.3 타입 안정성 강화
    
    ```tsx
    
    // src/store/types.ts
    
    export type StoreSelector<T> = (state: StoreState) => T;
    
    // 사용 예시
    
    const selectKESGActive: StoreSelector<boolean> = (state) => state.kESG.isActive;
    
    const isActive = useStore(selectKESGActive);
    
    ```
    
    ## 8. 파일 구조 상세
    
    ```
    
    src/
    
    ├── app/                       # 라우팅 & UI 엔트리
    
    │   ├── layout.tsx
    
    │   ├── page.tsx
    
    │   └── (routes)/
    
    │       ├── dashboard/
    
    │       ├── k-esg/
    
    │       ├── esrs/
    
    │       └── report/
    
    │
    
    ├── components/                # 피그마 기반 UI 컴포넌트
    
    │   ├── common/               # 버튼, 카드, 모달 등 공통 컴포넌트
    
    │   ├── layout/               # 네비게이션, 헤더 등
    
    │   ├── charts/               # 그래프, 시각화 컴포넌트
    
    │   ├── agents/               # Agent별 UI Widget (선택)
    
    │   └── forms/                # 입력 UI
    
    │
    
    ├── store/                     # Zustand store (단일 store + 슬라이스)
    
    │   ├── index.ts              # 단일 스토어 export
    
    │   ├── types.ts              # StoreState 타입 정의
    
    │   ├── slices/
    
    │   │   ├── kESG.ts          # K-ESG 에이전트 슬라이스
    
    │   │   ├── esrs.ts          # ESRS 에이전트 슬라이스
    
    │   │   ├── gri.ts           # GRI 에이전트 슬라이스
    
    │   │   ├── rewrite.ts       # Rewrite 에이전트 슬라이스
    
    │   │   ├── chatbot.ts       # Chatbot 에이전트 슬라이스
    
    │   │   ├── realtime.ts      # Realtime 에이전트 슬라이스
    
    │   │   └── [future].ts      # 향후 추가될 에이전트 슬라이스
    
    │   └── middleware/
    
    │       ├── persist.ts       # persist 미들웨어 설정
    
    │       └── devtools.ts      # devtools 미들웨어 설정
    
    │
    
    ├── lib/                       # 비즈니스 로직 + AI + 유틸
    
    │   ├── ai/                   # LLM(OpenAI) 래퍼, 헬퍼
    
    │   │   ├── kESG.ts          # K-ESG AI 로직
    
    │   │   ├── esrs.ts          # ESRS AI 로직
    
    │   │   ├── chatbot.ts       # Chatbot AI 로직
    
    │   │   └── ...
    
    │   ├── validators/
    
    │   ├── transformers/
    
    │   ├── utils/
    
    │   ├── constants/
    
    │   └── api/
    
    │
    
    ├── hooks/                     # custom hooks (UI/상태 분리)
    
    │   ├── useKESG.ts
    
    │   ├── useESRS.ts
    
    │   ├── useChatbot.ts
    
    │   └── ...
    
    │
    
    └── styles/                    # 스타일
    
    ```
    
    ## 9. 구현 순서
    
    ### Phase 1: 기본 구조 설정
    
    1. ✅ zustand 패키지 설치
    
    ```bash
    
    pnpm add zustand
    
    ```
    
    1. ✅ `src/store/` 디렉토리 구조 생성
    - `src/store/index.ts`
    - `src/store/types.ts`
    - `src/store/slices/` 디렉토리
    - `src/store/middleware/` 디렉토리
    1. ✅ 기본 타입 정의 (`types.ts`)
    2. ✅ 단일 스토어 인스턴스 생성 (`index.ts`)
    
    ### Phase 2: 에이전트 슬라이스 구현 (우선순위에 따라)
    
    1. ✅ `src/store/slices/kESG.ts` 생성
    2. ✅ `src/store/slices/esrs.ts` 생성
    3. ✅ `src/store/slices/gri.ts` 생성
    4. ✅ `src/store/slices/rewrite.ts` 생성
    5. ✅ `src/store/slices/chatbot.ts` 생성
    6. ✅ `src/store/slices/realtime.ts` 생성
    7. ✅ 각 에이전트 상태 및 액션 정의
    8. ✅ 에이전트별 비동기 액션 구현 (lib/ai 함수 호출)
    9. ✅ 스토어에 에이전트 슬라이스 통합
    
    ### Phase 2-1: AI 로직 분리
    
    1. ✅ `src/lib/ai/` 디렉토리 생성
    2. ✅ 각 에이전트별 AI 로직 함수 구현
    3. ✅ 스토어 슬라이스에서 lib/ai 함수 호출하도록 연결
    
    ### Phase 3: 마이그레이션
    
    1. ✅ 각 라우트의 `page.tsx`에서 `useState` 제거
    2. ✅ `useStore` 훅으로 교체
    3. ✅ 기능 동작 확인
    
    ### Phase 4: 최적화 및 확장
    
    1. ⏳ 성능 최적화 (선택적 구독 확인)
    2. ⏳ 커스텀 훅 생성 (`src/hooks/useKESG.ts` 등)
    3. ⏳ 에이전트 간 상호작용 로직 구현 (필요시)
    4. ⏳ **새로운 에이전트 추가 시**: 슬라이스만 추가하면 확장 가능
    5. ⏳ 미들웨어 추가 (persist, devtools)
    6. ⏳ 문서화 및 코드 리뷰
    
    ## 10. 참고사항
    
    ### 10.1 Next.js App Router 고려사항
    
    - `'use client'` 지시어: 스토어를 사용하는 컴포넌트는 클라이언트 컴포넌트여야 함
    - 서버 컴포넌트에서는 스토어 사용 불가
    - 초기 상태는 클라이언트에서만 접근 가능
    - `src/store/`는 클라이언트 전용 코드이므로 서버 컴포넌트에서 import 불가
    
    ### 10.2 타입스크립트 경로 별칭
    
    - `tsconfig.json`에 `@/*` 경로 별칭이 설정되어 있음
    - 스토어 import 시: `import { useStore } from '@/store'`
    - AI 로직 import 시: `import { processKESGData } from '@/lib/ai/kESG'`
    - 커스텀 훅 import 시: `import { useKESG } from '@/hooks/useKESG'`
    
    ### 10.3 상태 관리 범위
    
    - **전역 상태**: 여러 컴포넌트에서 공유되는 상태만 스토어에 저장
    - **로컬 상태**: 단일 컴포넌트에서만 사용되는 상태는 `useState` 유지
    - **비즈니스 로직**: AI/LLM 관련 로직은 `lib/ai/`에 위치, 스토어는 상태만 관리
    
    ### 10.4 import 경로
    
    ```tsx
    
    // 스토어 사용
    
    import { useStore } from '@/store';
    
    // 커스텀 훅 사용
    
    import { useKESG } from '@/hooks/useKESG';
    
    import { useChatbot } from '@/hooks/useChatbot';
    
    // AI 로직 직접 사용 (필요시)
    
    import { processKESGData } from '@/lib/ai/kESG';
    
    ```
    
    ## 11. 체크리스트
    
    ### 설치 및 설정
    
    - [ ]  zustand 패키지 설치
    - [ ]  `src/store/` 디렉토리 생성
    - [ ]  기본 파일 구조 생성
    
    ### 에이전트 슬라이스
    
    - [ ]  `src/store/types.ts` 작성 (에이전트 타입 포함)
    - [ ]  `src/store/slices/kESG.ts` 작성
    - [ ]  `src/store/slices/esrs.ts` 작성
    - [ ]  `src/store/slices/gri.ts` 작성
    - [ ]  `src/store/slices/rewrite.ts` 작성
    - [ ]  `src/store/slices/chatbot.ts` 작성
    - [ ]  `src/store/slices/realtime.ts` 작성
    - [ ]  `src/store/index.ts` 작성 및 통합
    
    ### AI 로직 분리
    
    - [ ]  `src/lib/ai/` 디렉토리 생성
    - [ ]  각 에이전트별 AI 로직 함수 구현
    - [ ]  스토어 슬라이스에서 lib/ai 함수 호출 연결
    
    ### 마이그레이션
    
    - [ ]  각 라우트의 `page.tsx` 마이그레이션
    - [ ]  기능 테스트
    - [ ]  성능 확인
    
    ### 최적화
    
    - [ ]  선택적 구독 적용
    - [ ]  불필요한 리렌더링 확인
    - [ ]  커스텀 훅 생성 (`src/hooks/useKESG.ts` 등)
    - [ ]  에이전트 간 상호작용 테스트
    - [ ]  코드 리뷰
    
    ## 12. 에이전트 관리 전략
    
    ### 12.1 에이전트 슬라이스 분리 원칙
    
    - **독립성**: 각 에이전트는 완전히 독립적인 슬라이스로 관리
    - **일관성**: 모든 에이전트는 공통 `AgentState` 인터페이스를 상속
    - **확장성**: 각 에이전트는 고유한 상태와 액션을 추가할 수 있음
    - **확장 가능성**: 새로운 에이전트 추가 시 슬라이스만 추가하면 됨 (현재 6개, 향후 확장 가능)
    
    ### 12.2 에이전트 간 상호작용
    
    - **직접 참조 금지**: 에이전트 슬라이스 간 직접 참조 금지
    - **공통 상태 활용**: 에이전트 간 데이터 공유가 필요한 경우 공통 슬라이스 활용
    - **이벤트 기반**: 에이전트 간 통신은 이벤트나 콜백 패턴 활용
    
    ### 12.3 AI 로직 분리
    
    - **비즈니스 로직 분리**: AI/LLM 관련 로직은 `lib/ai/`에 위치
    - **스토어 역할**: 스토어는 상태 관리만 담당
    - **에이전트 연동**: 각 에이전트 슬라이스는 `lib/ai/`의 함수를 호출하여 비즈니스 로직 처리
    - **재사용성**: `lib/ai/`의 함수는 여러 컴포넌트나 슬라이스에서 재사용 가능
    
    ### 12.4 새로운 에이전트 추가 방법
    
    1. `src/store/types.ts`에 새 에이전트 슬라이스 인터페이스 추가
    2. `src/store/slices/[newAgent].ts` 생성
    3. `src/store/index.ts`에 새 슬라이스 통합
    4. `src/lib/ai/[newAgent].ts`에 AI 로직 구현
    5. 필요시 `src/hooks/use[NewAgent].ts` 생성
    
    ## 13. 예상 문제 및 해결방안
    
    ### 13.1 단일 스토어 유지
    
    - **문제**: 여러 스토어를 만들고 싶은 유혹
    - **해결**: **절대적으로 단일 스토어만 유지**. 모든 슬라이스는 하나의 스토어에 통합
    
    ### 13.2 서버 컴포넌트에서의 사용
    
    - **문제**: 서버 컴포넌트에서 스토어 사용 시도
    - **해결**: 스토어를 사용하는 컴포넌트는 반드시 `'use client'` 지시어 추가
    
    ### 13.3 타입 에러
    
    - **문제**: 슬라이스 통합 시 타입 불일치
    - **해결**: `StoreState` 인터페이스를 정확히 정의하고, 슬라이스 타입과 일치시킴
    
    ### 13.4 에이전트 슬라이스 간 타입 충돌
    
    - **문제**: 여러 에이전트 슬라이스를 통합할 때 타입 충돌
    - **해결**: 각 에이전트 슬라이스는 고유한 네임스페이스(kESG, esrs, gri 등)를 사용하여 충돌 방지
    
    ### 13.5 AI 로직과 스토어 분리
    
    - **문제**: 스토어 슬라이스에서 직접 AI API 호출
    - **해결**: AI 로직은 `lib/ai/`에 위치하고, 스토어 슬라이스는 해당 함수를 호출만 함
    
    ### 13.6 새로운 에이전트 추가 시
    
    - **문제**: 기존 구조를 깨뜨리지 않고 새 에이전트 추가
    - **해결**:
    
    1. `StoreState`에 새 슬라이스 추가
    
    2. 새 슬라이스 파일 생성
    
    3. `index.ts`에 통합
    
    4. 기존 코드는 영향 없음 (확장 가능성 보장)
    
    ## 14. 대규모 에이전트 확장 전략
    
    ### 14.1 확장성 고려사항
    
    **현재 전략의 확장성:**
    
    - ✅ **슬라이스 패턴**: 에이전트가 많아져도 각각 독립적인 슬라이스로 관리 가능
    - ✅ **타입 안정성**: TypeScript로 컴파일 타임에 타입 체크
    - ✅ **모듈화**: 각 에이전트가 독립적으로 관리되어 유지보수 용이
    
    **확장 시 주의사항:**
    
    1. **스토어 크기 관리**
       - 에이전트가 많아질수록 스토어 크기 증가
       - 필요한 에이전트만 활성화하는 전략 고려
       - Lazy loading 패턴 적용 가능
    
    2. **성능 최적화**
       - 선택적 구독 필수: 전체 스토어 구독 금지
       - `useShallow` 훅으로 객체 비교 최적화
       - 불필요한 리렌더링 방지
    
    3. **메모리 관리**
       - 대화 히스토리 제한: 각 에이전트별 최대 메시지 수 제한
       - 오래된 메시지 자동 삭제
       - 사용하지 않는 에이전트 상태 정리
    
    ### 14.2 대화 히스토리 관리 전략
    
    **메모리 최적화를 위한 히스토리 제한:**
    
    ```typescript
    // src/store/types.ts
    export interface AgentState {
      // ... 기존 필드들
      conversationHistory: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
        timestamp: number;
      }>;
      maxHistoryLength?: number; // 기본값: 100
    }
    
    // src/store/slices/kESG.ts
    export const createKESGSlice: StateCreator<...> = (set, get) => ({
      // ... 기존 상태
      maxHistoryLength: 100, // 최대 100개 메시지 유지
      
      addMessage: (role, content) => {
        set((state) => {
          const newMessage = {
            role,
            content,
            timestamp: Date.now(),
          };
          
          const history = [...state.kESG.conversationHistory, newMessage];
          
          // 최대 길이 초과 시 오래된 메시지 제거
          const maxLength = state.kESG.maxHistoryLength ?? 100;
          const trimmedHistory = history.length > maxLength
            ? history.slice(-maxLength)
            : history;
          
          state.kESG.conversationHistory = trimmedHistory;
        });
      },
    });
    ```
    
    ### 14.3 동적 에이전트 관리 (선택사항)
    
    **런타임에 에이전트 추가/제거가 필요한 경우:**
    
    ```typescript
    // src/store/types.ts
    export interface AgentRegistrySlice {
      // 동적 에이전트 관리
      registeredAgents: Record<string, AgentConfig>;
      registerAgent: (id: string, config: AgentConfig) => void;
      unregisterAgent: (id: string) => void;
      getAgentConfig: (id: string) => AgentConfig | null;
    }
    
    // 정적 슬라이스와 동적 레지스트리 병행 사용 가능
    export interface StoreState {
      // 정적 에이전트 (항상 존재)
      kESG: KESGSlice;
      esrs: ESRSSlice;
      // ... 기타 정적 에이전트
      
      // 동적 에이전트 레지스트리 (선택사항)
      agentRegistry: AgentRegistrySlice;
    }
    ```
    
    **권장사항:**
    
    - 대부분의 경우 정적 슬라이스 패턴으로 충분
    - 동적 에이전트가 필요한 경우에만 레지스트리 패턴 추가
    - 정적 + 동적 혼합 사용 가능
    
    ### 14.4 성능 최적화 가이드
    
    **에이전트가 많을 때 (10개 이상):**
    
    1. **선택적 구독 필수**
       ```typescript
       // ❌ 나쁜 예: 전체 스토어 구독
       const store = useStore();
       
       // ✅ 좋은 예: 필요한 에이전트만 구독
       const kESG = useStore((state) => state.kESG);
       ```
    
    2. **useShallow 활용**
       ```typescript
       import { useShallow } from 'zustand/react/shallow';
       
       const { kESG, esrs } = useStore(
         useShallow((state) => ({
           kESG: state.kESG,
           esrs: state.esrs,
         }))
       );
       ```
    
    3. **커스텀 훅으로 캡슐화**
       ```typescript
       // src/hooks/useKESG.ts
       export const useKESG = () => {
         // 필요한 상태만 선택적으로 구독
         const isActive = useStore((state) => state.kESG.isActive);
         const isLoading = useStore((state) => state.kESG.isLoading);
         // ...
       };
       ```
    
    4. **액션만 필요한 경우 분리**
       ```typescript
       // 리렌더링 없이 액션만 사용
       const processKESGData = useStore((state) => state.kESG.processKESGData);
       ```
    
    ### 14.5 확장 시나리오별 대응
    
    **시나리오 1: 에이전트 10개 이하**
    - 현재 전략 그대로 사용
    - 정적 슬라이스 패턴으로 충분
    - 성능 이슈 없음
    
    **시나리오 2: 에이전트 10-20개**
    - 현재 전략 유지
    - 선택적 구독 필수
    - 대화 히스토리 제한 적용
    - 커스텀 훅으로 캡슐화 강화
    
    **시나리오 3: 에이전트 20개 이상**
    - 현재 전략 유지 가능
    - Lazy loading 고려 (필요한 에이전트만 초기화)
    - 메모리 관리 전략 강화
    - 동적 에이전트 레지스트리 패턴 검토
    
    **시나리오 4: 런타임에 에이전트 추가/제거 필요**
    - 정적 슬라이스 + 동적 레지스트리 혼합
    - 또는 완전히 동적 레지스트리 패턴으로 전환
    
    ### 14.6 모니터링 및 디버깅
    
    **에이전트가 많을 때 디버깅 전략:**
    
    1. **DevTools 활용**
       ```typescript
       // 개발 환경에서만 활성화
       devtools(
         (set, get) => ({ /* ... */ }),
         { 
           name: 'AppStore',
           enabled: process.env.NODE_ENV === 'development'
         }
       )
       ```
    
    2. **에이전트별 상태 로깅**
       ```typescript
       // 각 슬라이스에 디버그 모드 추가
       const debug = process.env.NODE_ENV === 'development';
       if (debug) {
         console.log('kESG state:', state.kESG);
       }
       ```
    
    3. **성능 모니터링**
       - React DevTools Profiler로 리렌더링 확인
       - 불필요한 리렌더링 발생 시 선택적 구독 확인
    
    ### 14.7 결론: 현재 전략의 확장성
    
    **✅ 현재 전략으로 충분한 이유:**
    
    1. **슬라이스 패턴의 확장성**
       - 에이전트가 많아져도 각각 독립적으로 관리
       - 새 에이전트 추가 시 기존 코드 영향 없음
    
    2. **Zustand의 성능**
       - 선택적 구독으로 불필요한 리렌더링 방지
       - 대규모 상태 관리에도 성능 우수
    
    3. **타입 안정성**
       - TypeScript로 컴파일 타임에 오류 방지
       - 확장 시에도 타입 체크 보장
    
    4. **모듈화**
       - 각 에이전트가 독립적으로 관리되어 유지보수 용이
       - 특정 에이전트만 수정해도 다른 에이전트 영향 없음
    
    **⚠️ 추가 고려사항 (선택사항):**
    
    - 대화 히스토리 제한 (메모리 관리)
    - 동적 에이전트 관리 (런타임 추가/제거가 필요한 경우)
    - Lazy loading (에이전트가 매우 많을 때)
    
    **결론: 현재 전략으로 에이전트가 많아져도 충분히 확장 가능합니다.**
    
    ---
    
    ## 15. 요약
    
    ### 핵심 사항
    
    1. **단일 스토어 절대 원칙**: `src/store/index.ts`에서 하나의 스토어만 export
    2. **에이전트 슬라이스**: 각 에이전트는 독립적인 슬라이스로 관리 (현재 6개, 확장 가능)
    3. **확장 가능성**: 새 에이전트 추가 시 슬라이스만 추가하면 됨 (10개, 20개 이상도 가능)
    4. **비즈니스 로직 분리**: AI/LLM 로직은 `src/lib/ai/`에 위치
    5. **성능 최적화**: 선택적 구독 필수, 대화 히스토리 제한 등 메모리 관리 전략
    
    ### 구현 체크리스트
    
    - [ ]  zustand 패키지 설치
    - [ ]  `src/store/` 디렉토리 구조 생성
    - [ ]  6개 에이전트 슬라이스 구현
    - [ ]  `src/lib/ai/` 디렉토리에 AI 로직 구현
    - [ ]  단일 스토어 통합
    - [ ]  커스텀 훅 생성 (`src/hooks/`)
    - [ ]  컴포넌트 마이그레이션
    
    ### 다음 단계
    
    1. Phase 1: 기본 구조 설정
    2. Phase 2: 에이전트 슬라이스 구현
    3. Phase 3: 컴포넌트 마이그레이션
    4. Phase 4: 최적화 및 확장
    
    ---
    
    **이 전략 문서는 승인되었으며, 프로젝트 구현 시 이 문서를 기준으로 진행합니다.**