// src/store/slices/esrs.ts
import { StateCreator } from 'zustand';
import { StoreState, ESRSSlice } from '../types';
// import { processESRSData } from '@/lib/ai/esrs'; // AI 로직은 lib/ai에 위치

export const createESRSSlice: StateCreator<
  StoreState,
  [],
  [],
  ESRSSlice
> = (set, get) => ({
  id: 'esrs',
  name: 'ESRS Agent',
  isActive: false,
  isLoading: false,
  error: null,
  lastResponse: null,
  conversationHistory: [],
  maxHistoryLength: 100,
  currentReport: null,

  setActive: (active: boolean) =>
    set((state) => ({
      esrs: { ...state.esrs, isActive: active },
    })),

  setLoading: (loading: boolean) =>
    set((state) => ({
      esrs: { ...state.esrs, isLoading: loading },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      esrs: { ...state.esrs, error },
    })),

  addMessage: (role, content) => {
    const state = get();
    const newMessage = {
      role,
      content,
      timestamp: Date.now(),
    };
    const history = [...state.esrs.conversationHistory, newMessage];
    const maxLength = state.esrs.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      esrs: { ...state.esrs, conversationHistory: trimmedHistory },
    }));
  },

  clearHistory: () =>
    set((state) => ({
      esrs: { ...state.esrs, conversationHistory: [] },
    })),

  reset: () =>
    set((state) => ({
      esrs: {
        ...state.esrs,
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
      esrs: { ...state.esrs, currentReport: report },
    })),

  processESRSData: async (data: any) => {
    set((state) => ({
      esrs: { ...state.esrs, isLoading: true, error: null },
    }));

    try {
      // AI 로직은 lib/ai에서 호출
      // const response = await processESRSData(data);
      const response = { success: true, data }; // 임시 응답

      set((state) => {
        const newMessage = {
          role: 'assistant' as const,
          content: JSON.stringify(response),
          timestamp: Date.now(),
        };
        const history = [...state.esrs.conversationHistory, newMessage];
        const maxLength = state.esrs.maxHistoryLength ?? 100;
        const trimmedHistory = history.length > maxLength
          ? history.slice(-maxLength)
          : history;

        return {
          esrs: {
            ...state.esrs,
            lastResponse: response,
            isLoading: false,
            conversationHistory: trimmedHistory,
          },
        };
      });
    } catch (error: any) {
      set((state) => ({
        esrs: { ...state.esrs, error: error.message, isLoading: false },
      }));
    }
  },
});

