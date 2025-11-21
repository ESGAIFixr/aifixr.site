/**
 * Zustand 단일 Store
 * 모든 슬라이스를 combine하여 하나의 Store로 관리합니다.
 */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import { createKESGSlice } from './slices/kESG';
import { createESRSSlice } from './slices/esrs';
import { createGRISlice } from './slices/gri';
import { createRewriteSlice } from './slices/rewrite';
import { createChatbotSlice } from './slices/chatbot';
import { createRealtimeSlice } from './slices/realtime';
import type { StoreState } from './types';
// 향후 추가될 에이전트
// import { createNewAgentSlice } from './slices/newAgent';

export const useStore = create<StoreState>()(
  devtools(
    persist(
      ((...a: Parameters<StateCreator<StoreState, [], [], {}>>) => ({
        kESG: createKESGSlice(...a),
        esrs: createESRSSlice(...a),
        gri: createGRISlice(...a),
        rewrite: createRewriteSlice(...a),
        chatbot: createChatbotSlice(...a),
        realtime: createRealtimeSlice(...a),
        // 향후 추가될 에이전트
        // newAgent: createNewAgentSlice(...a),
      })) as StateCreator<StoreState, [], [], StoreState>,
      {
        name: 'app-storage', // localStorage key
        partialize: (state: StoreState) => ({
          // persist할 상태만 선택 (민감한 정보 및 임시 상태 제외)
          chatbot: {
            conversationHistory: state.chatbot.conversationHistory,
            input: state.chatbot.input,
            sessionId: state.chatbot.sessionId,
            maxHistoryLength: state.chatbot.maxHistoryLength,
          },
          rewrite: {
            originalText: state.rewrite.originalText,
            rewrittenText: state.rewrite.rewrittenText,
            rewriteOptions: state.rewrite.rewriteOptions,
          },
          kESG: {
            currentReport: state.kESG.currentReport,
          },
          esrs: {
            currentReport: state.esrs.currentReport,
          },
          gri: {
            currentReport: state.gri.currentReport,
          },
        }),
      }
    ),
    { name: 'AppStore' } // Redux DevTools 이름
  )
);

