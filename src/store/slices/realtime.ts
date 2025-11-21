// src/store/slices/realtime.ts
import { StateCreator } from 'zustand';
import { StoreState, RealtimeSlice } from '../types';
// import { subscribe as subscribeRealtime, unsubscribe as unsubscribeRealtime } from '@/lib/ai/realtime'; // AI 로직은 lib/ai에 위치

export const createRealtimeSlice: StateCreator<
  StoreState,
  [],
  [],
  RealtimeSlice
> = (set, get) => ({
  id: 'realtime',
  name: 'Realtime Agent',
  isActive: false,
  isLoading: false,
  error: null,
  lastResponse: null,
  conversationHistory: [],
  maxHistoryLength: 100,
  connectionStatus: 'disconnected',
  lastUpdate: null,

  setActive: (active: boolean) =>
    set((state) => ({
      realtime: { ...state.realtime, isActive: active },
    })),

  setLoading: (loading: boolean) =>
    set((state) => ({
      realtime: { ...state.realtime, isLoading: loading },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      realtime: { ...state.realtime, error },
    })),

  addMessage: (role, content) => {
    const state = get();
    const newMessage = {
      role,
      content,
      timestamp: Date.now(),
    };
    const history = [...state.realtime.conversationHistory, newMessage];
    const maxLength = state.realtime.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      realtime: { ...state.realtime, conversationHistory: trimmedHistory },
    }));
  },

  clearHistory: () =>
    set((state) => ({
      realtime: { ...state.realtime, conversationHistory: [] },
    })),

  reset: () =>
    set((state) => ({
      realtime: {
        ...state.realtime,
        isActive: false,
        isLoading: false,
        error: null,
        lastResponse: null,
        conversationHistory: [],
        connectionStatus: 'disconnected',
        lastUpdate: null,
      },
    })),

  subscribe: (channel: string) => {
    set((state) => ({
      realtime: {
        ...state.realtime,
        connectionStatus: 'connecting',
      },
    }));

    try {
      // AI 로직은 lib/ai에서 호출
      // await subscribeRealtime(channel);
      
      set((state) => ({
        realtime: {
          ...state.realtime,
          connectionStatus: 'connected',
          lastUpdate: Date.now(),
        },
      }));
    } catch (error: any) {
      set((state) => ({
        realtime: {
          ...state.realtime,
          connectionStatus: 'disconnected',
          error: error.message,
        },
      }));
    }
  },

  unsubscribe: (channel: string) => {
    try {
      // AI 로직은 lib/ai에서 호출
      // await unsubscribeRealtime(channel);
      
      set((state) => ({
        realtime: {
          ...state.realtime,
          connectionStatus: 'disconnected',
          lastUpdate: null,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        realtime: {
          ...state.realtime,
          error: error.message,
        },
      }));
    }
  },
});

