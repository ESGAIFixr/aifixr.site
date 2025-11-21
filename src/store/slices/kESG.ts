// src/store/slices/kESG.ts
import { StateCreator } from 'zustand';
import { StoreState, KESGSlice } from '../types';
// import { processKESGData } from '@/lib/ai/kESG'; // AI 로직은 lib/ai에 위치

export const createKESGSlice: StateCreator<
  StoreState,
  [],
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
  maxHistoryLength: 100,
  currentReport: null,

  setActive: (active: boolean) =>
    set((state) => ({
      kESG: { ...state.kESG, isActive: active },
    })),

  setLoading: (loading: boolean) =>
    set((state) => ({
      kESG: { ...state.kESG, isLoading: loading },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      kESG: { ...state.kESG, error },
    })),

  addMessage: (role, content) => {
    const state = get();
    const newMessage = {
      role,
      content,
      timestamp: Date.now(),
    };
    const history = [...state.kESG.conversationHistory, newMessage];
    const maxLength = state.kESG.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      kESG: { ...state.kESG, conversationHistory: trimmedHistory },
    }));
  },

  clearHistory: () =>
    set((state) => ({
      kESG: { ...state.kESG, conversationHistory: [] },
    })),

  reset: () =>
    set((state) => ({
      kESG: {
        ...state.kESG,
        isActive: false,
        isLoading: false,
        error: null,
        lastResponse: null,
        conversationHistory: [],
        currentReport: null,
      },
    })),

  setCurrentReport: (report: any) =>
    set((state) => ({
      kESG: { ...state.kESG, currentReport: report },
    })),

  processKESGData: async (data: any) => {
    set((state) => ({
      kESG: { ...state.kESG, isLoading: true, error: null },
    }));

    try {
      // AI 로직은 lib/ai에서 호출
      // const response = await processKESGData(data);
      const response = { success: true, data }; // 임시 응답

      set((state) => {
        const newMessage = {
          role: 'assistant' as const,
          content: JSON.stringify(response),
          timestamp: Date.now(),
        };
        const history = [...state.kESG.conversationHistory, newMessage];
        const maxLength = state.kESG.maxHistoryLength ?? 100;
        const trimmedHistory = history.length > maxLength
          ? history.slice(-maxLength)
          : history;

        return {
          kESG: {
            ...state.kESG,
            lastResponse: response,
            isLoading: false,
            conversationHistory: trimmedHistory,
          },
        };
      });
    } catch (error: any) {
      set((state) => ({
        kESG: { ...state.kESG, error: error.message, isLoading: false },
      }));
    }
  },
});

