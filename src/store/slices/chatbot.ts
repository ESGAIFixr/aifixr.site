// src/store/slices/chatbot.ts
import { StateCreator } from 'zustand';
import { StoreState, ChatbotSlice } from '../types';
import axios from 'axios';
// import { sendChatMessage } from '@/lib/ai/chatbot'; // AI 로직은 lib/ai에 위치

const initialMessages = [
  {
    role: 'assistant' as const,
    content: '안녕하세요! 궁금한 내용을 입력하면 언제든지 도와드릴게요.',
    timestamp: Date.now(),
  },
  {
    role: 'user' as const,
    content: '이 화면은 어떤 용도의 데모인가요?',
    timestamp: Date.now(),
  },
  {
    role: 'assistant' as const,
    content: 'ChatGPT 스타일의 인터페이스를 구현한 예시입니다. 상단 입력창에 메시지를 작성해 보내면 간단한 데모 응답이 표시됩니다.',
    timestamp: Date.now(),
  },
];

export const createChatbotSlice: StateCreator<
  StoreState,
  [],
  [],
  ChatbotSlice
> = (set, get) => ({
  id: 'chatbot',
  name: 'Chatbot Agent',
  isActive: false,
  isLoading: false,
  error: null,
  lastResponse: null,
  conversationHistory: initialMessages,
  maxHistoryLength: 100,
  sessionId: null,
  input: '',
  messageIdCounter: initialMessages.length,

  setActive: (active: boolean) =>
    set((state) => ({
      chatbot: { ...state.chatbot, isActive: active },
    })),

  setLoading: (loading: boolean) =>
    set((state) => ({
      chatbot: { ...state.chatbot, isLoading: loading },
    })),

  setError: (error: string | null) =>
    set((state) => ({
      chatbot: { ...state.chatbot, error },
    })),

  addMessage: (role, content) => {
    const state = get();
    const newMessage = {
      role,
      content,
      timestamp: Date.now(),
    };
    const history = [...state.chatbot.conversationHistory, newMessage];
    const maxLength = state.chatbot.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      chatbot: { ...state.chatbot, conversationHistory: trimmedHistory },
    }));
  },

  clearHistory: () =>
    set((state) => ({
      chatbot: { ...state.chatbot, conversationHistory: initialMessages },
    })),

  reset: () =>
    set((state) => ({
      chatbot: {
        ...state.chatbot,
        isActive: false,
        isLoading: false,
        error: null,
        lastResponse: null,
        conversationHistory: initialMessages,
        sessionId: null,
        input: '',
        messageIdCounter: initialMessages.length,
      },
    })),

  setInput: (input: string) =>
    set((state) => ({
      chatbot: { ...state.chatbot, input },
    })),

  getNextMessageId: () => {
    const state = get();
    const nextId = state.chatbot.messageIdCounter + 1;
    set((state) => ({
      chatbot: { ...state.chatbot, messageIdCounter: nextId },
    }));
    return nextId;
  },

  sendMessage: async (message: string) => {
    set((state) => ({
      chatbot: {
        ...state.chatbot,
        isLoading: true,
        error: null,
        input: '',
      },
    }));

    // 사용자 메시지 추가
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: Date.now(),
    };
    const state = get();
    const history = [...state.chatbot.conversationHistory, userMessage];
    const maxLength = state.chatbot.maxHistoryLength ?? 100;
    const trimmedHistory = history.length > maxLength
      ? history.slice(-maxLength)
      : history;

    set((state) => ({
      chatbot: { ...state.chatbot, conversationHistory: trimmedHistory },
    }));

    try {
      // AI 로직은 lib/ai에서 호출
      // const response = await sendChatMessage({
      //   message,
      //   sessionId: get().chatbot.sessionId,
      //   history: get().chatbot.conversationHistory,
      // });

      // 임시: 백엔드 API 호출 (기존 로직 유지)
      // Discovery Server (Gateway)를 통한 호출
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      await axios.get(`${API_BASE_URL}/api/soccer/search`, {
        params: { keyword: message },
        timeout: 10000, // 10초 타임아웃
      });

      const DELAY = 500;
      setTimeout(() => {
        const assistantMessage = {
          role: 'assistant' as const,
          content: '입력 내용을 백엔드로 전달했어요. 추가 안내가 필요하면 백엔드 응답을 활용해 보세요.',
          timestamp: Date.now(),
        };
        const state = get();
        const history = [...state.chatbot.conversationHistory, assistantMessage];
        const maxLength = state.chatbot.maxHistoryLength ?? 100;
        const trimmedHistory = history.length > maxLength
          ? history.slice(-maxLength)
          : history;

        set((state) => ({
          chatbot: {
            ...state.chatbot,
            lastResponse: { content: assistantMessage.content },
            isLoading: false,
            conversationHistory: trimmedHistory,
          },
        }));
      }, DELAY);
    } catch (error: any) {
      console.error("백엔드 호출 중 오류가 발생했습니다.", error);

      // 에러 타입에 따른 메시지 구분
      let errorContent = '백엔드에 메시지를 전달하지 못했습니다.';

      if (error.response) {
        // 서버 응답이 있는 경우 (4xx, 5xx)
        const status = error.response.status;
        if (status === 503) {
          errorContent = '백엔드 서비스가 일시적으로 사용할 수 없습니다. 서비스가 시작 중이거나 Eureka에 등록되지 않았을 수 있습니다. 잠시 후 다시 시도해 주세요.';
        } else if (status === 404) {
          errorContent = '요청한 엔드포인트를 찾을 수 없습니다. 서비스 라우팅 설정을 확인해 주세요.';
        } else if (status >= 500) {
          errorContent = '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        } else {
          errorContent = `서버 오류가 발생했습니다. (상태 코드: ${status})`;
        }
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        errorContent = '서버에 연결할 수 없습니다. 백엔드 서비스가 실행 중인지 확인해 주세요.';
      } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorContent = '요청 시간이 초과되었습니다. 서버가 응답하지 않습니다.';
      }

      const errorMessage = {
        role: 'assistant' as const,
        content: errorContent,
        timestamp: Date.now(),
      };
      const state = get();
      const history = [...state.chatbot.conversationHistory, errorMessage];
      const maxLength = state.chatbot.maxHistoryLength ?? 100;
      const trimmedHistory = history.length > maxLength
        ? history.slice(-maxLength)
        : history;

      set((state) => ({
        chatbot: {
          ...state.chatbot,
          error: error.response?.status
            ? `HTTP ${error.response.status}: ${errorContent}`
            : error.message || '알 수 없는 오류',
          isLoading: false,
          conversationHistory: trimmedHistory,
        },
      }));
    }
  },
});

