// src/store/slices/rewrite.ts
import { StateCreator } from 'zustand';
import { StoreState, RewriteSlice } from '../types';
// import { rewriteText as rewriteTextAI } from '@/lib/ai/rewrite'; // AI 로직은 lib/ai에 위치

export const createRewriteSlice: StateCreator<
  StoreState,
  [],
  [],
  RewriteSlice
> = (set, get) => ({
  id: 'rewrite',
  name: 'Rewrite Agent',
  isActive: false,
  isLoading: false,
  error: null,
  lastResponse: null,
  conversationHistory: [],
  maxHistoryLength: 100,
  originalText: null,
  rewrittenText: null,
  rewriteOptions: {},

  setActive: (active: boolean) =>
    set((state) => ({
      rewrite: { ...state.rewrite, isActive: active },
    })),

  setLoading: (loading: boolean) =>
    set((state) => ({
      rewrite: { ...state.rewrite, isLoading: loading },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      rewrite: { ...state.rewrite, error },
    })),

  addMessage: (role, content) => {
    const state = get();
    const newMessage = {
      role,
      content,
      timestamp: Date.now(),
    };
    const history = [...state.rewrite.conversationHistory, newMessage];
    const maxLength = state.rewrite.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      rewrite: { ...state.rewrite, conversationHistory: trimmedHistory },
    }));
  },

  clearHistory: () =>
    set((state) => ({
      rewrite: { ...state.rewrite, conversationHistory: [] },
    })),

  reset: () =>
    set((state) => ({
      rewrite: {
        ...state.rewrite,
        isActive: false,
        isLoading: false,
        error: null,
        lastResponse: null,
        conversationHistory: [],
        originalText: null,
        rewrittenText: null,
        rewriteOptions: {},
      },
    })),

  rewriteText: async (text: string, options?: any) => {
    set((state) => ({
      rewrite: {
        ...state.rewrite,
        isLoading: true,
        error: null,
        originalText: text,
        rewriteOptions: options || {},
      },
    }));

    try {
      // AI 로직은 lib/ai에서 호출
      // const response = await rewriteTextAI(text, options);
      const response = { rewritten: text + ' (rewritten)' }; // 임시 응답

      set((state) => {
        const newMessage = {
          role: 'assistant' as const,
          content: response.rewritten,
          timestamp: Date.now(),
        };
        const history = [...state.rewrite.conversationHistory, newMessage];
        const maxLength = state.rewrite.maxHistoryLength ?? 100;
        const trimmedHistory = history.length > maxLength
          ? history.slice(-maxLength)
          : history;

        return {
          rewrite: {
            ...state.rewrite,
            rewrittenText: response.rewritten,
            lastResponse: response,
            isLoading: false,
            conversationHistory: trimmedHistory,
          },
        };
      });
    } catch (error: any) {
      set((state) => ({
        rewrite: { ...state.rewrite, error: error.message, isLoading: false },
      }));
    }
  },
});

