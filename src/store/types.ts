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
  maxHistoryLength?: number;
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
}

export interface ESRSSlice extends AgentState, AgentActions {
  // ESRS 전용 상태 및 액션
  currentReport: any | null;
  setCurrentReport: (report: any) => void;
  processESRSData: (data: any) => Promise<void>;
}

export interface GRISlice extends AgentState, AgentActions {
  // GRI 전용 상태 및 액션
  currentReport: any | null;
  setCurrentReport: (report: any) => void;
  processGRIData: (data: any) => Promise<void>;
}

export interface RewriteSlice extends AgentState, AgentActions {
  // Rewrite 전용 상태 및 액션
  originalText: string | null;
  rewrittenText: string | null;
  rewriteOptions: any;
  rewriteText: (text: string, options?: any) => Promise<void>;
}

export interface ChatbotSlice extends AgentState, AgentActions {
  // Chatbot 전용 상태 및 액션
  sessionId: string | null;
  input: string;
  setInput: (input: string) => void;
  sendMessage: (message: string) => Promise<void>;
  messageIdCounter: number;
  getNextMessageId: () => number;
}

export interface RealtimeSlice extends AgentState, AgentActions {
  // Realtime 전용 상태 및 액션
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
  lastUpdate: number | null;
  subscribe: (channel: string) => void;
  unsubscribe: (channel: string) => void;
}

// 향후 추가될 에이전트를 위한 확장 가능한 구조
// export interface NewAgentSlice extends AgentState, AgentActions {
//   // 새 에이전트 전용 상태 및 액션
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

