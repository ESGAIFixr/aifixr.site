// src/store/slices/gri.ts
import { StateCreator } from 'zustand';
import { StoreState, GRISlice } from '../types';
// import { processGRIData } from '@/lib/ai/gri'; // AI 로직은 lib/ai에 위치

export const createGRISlice: StateCreator<
  StoreState,
  [],
  [],
  GRISlice
> = (set, get) => ({
  id: 'gri',
  name: 'GRI Agent',
  isActive: false,
  isLoading: false,
  error: null,
  lastResponse: null,
  conversationHistory: [],
  maxHistoryLength: 100,
  currentReport: null,

  setActive: (active: boolean) =>
    set((state) => ({
      gri: { ...state.gri, isActive: active },
    })),

  setLoading: (loading: boolean) =>
    set((state) => ({
      gri: { ...state.gri, isLoading: loading },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      gri: { ...state.gri, error },
    })),

  addMessage: (role, content) => {
    const state = get();
    const newMessage = {
      role,
      content,
      timestamp: Date.now(),
    };
    const history = [...state.gri.conversationHistory, newMessage];
    const maxLength = state.gri.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      gri: { ...state.gri, conversationHistory: trimmedHistory },
    }));
  },

  clearHistory: () =>
    set((state) => ({
      gri: { ...state.gri, conversationHistory: [] },
    })),

  reset: () =>
    set((state) => ({
      gri: {
        ...state.gri,
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
      gri: { ...state.gri, currentReport: report },
    })),

  processGRIData: async (data: any) => {
    set((state) => ({
      gri: { ...state.gri, isLoading: true, error: null },
    }));

    try {
      // AI 로직은 lib/ai에서 호출
      // const response = await processGRIData(data);
      const response = { success: true, data }; // 임시 응답

      set((state) => {
        const newMessage = {
          role: 'assistant' as const,
          content: JSON.stringify(response),
          timestamp: Date.now(),
        };
        const history = [...state.gri.conversationHistory, newMessage];
        const maxLength = state.gri.maxHistoryLength ?? 100;
        const trimmedHistory = history.length > maxLength
          ? history.slice(-maxLength)
          : history;

        return {
          gri: {
            ...state.gri,
            lastResponse: response,
            isLoading: false,
            conversationHistory: trimmedHistory,
          },
        };
      });
    } catch (error: any) {
      set((state) => ({
        gri: { ...state.gri, error: error.message, isLoading: false },
      }));
    }
  },
});

