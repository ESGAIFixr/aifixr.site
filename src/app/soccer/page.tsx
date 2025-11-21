"use client";

import React, { FormEvent, useEffect, useRef } from "react";
import { useStore } from "@/store";

type Role = "user" | "assistant";

type Message = {
  id: number;
  role: Role;
  content: string;
};

export default function Home() {
  // 스토어에서 chatbot 상태 가져오기
  const chatbot = useStore((state) => state.chatbot);
  const input = useStore((state) => state.chatbot.input);
  const setInput = useStore((state) => state.chatbot.setInput);
  const sendMessage = useStore((state) => state.chatbot.sendMessage);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // conversationHistory를 Message[] 형식으로 변환
  const messages: Message[] = chatbot.conversationHistory.map((msg, index) => ({
    id: index + 1,
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content,
  }));

  const pending = chatbot.isLoading;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || pending) {
      return;
    }

    await sendMessage(trimmed);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#131314] text-zinc-100">
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-1">
          <h1 className="text-lg font-semibold">ChatGPT 스타일 데모</h1>
          <p className="text-sm text-zinc-400">
            메시지를 입력하면 간단한 안내 응답이 돌아오는 인터랙티브 예시입니다.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-6">
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex gap-3 rounded-3xl border border-white/5 p-5 shadow-sm transition ${message.role === "assistant"
                ? "bg-white/[0.04]"
                : "bg-white/[0.02]"
                }`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium ${message.role === "assistant"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-sky-500/10 text-sky-400"
                  }`}
              >
                {message.role === "assistant" ? "GPT" : "ME"}
              </div>
              <div className="flex-1 whitespace-pre-wrap text-[15px] leading-7 text-zinc-100">
                {message.content}
              </div>
            </div>
          ))}
          {pending ? (
            <div className="flex gap-3 rounded-3xl border border-white/5 bg-white/[0.04] p-5 text-sm text-zinc-300">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                GPT
              </div>
              <div className="flex items-center gap-2 text-[15px] leading-7">
                <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:-0.2s]"></span>
                <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-zinc-300 [animation-delay:-0.05s]"></span>
                <span className="inline-flex h-2 w-2 animate-bounce rounded-full bg-zinc-300"></span>
              </div>
            </div>
          ) : null}
          <div ref={bottomRef} />
        </div>
      </main>

      <form
        onSubmit={handleSubmit}
        className="border-t border-white/10 bg-[#131314]/95 px-4 py-5 backdrop-blur sm:px-6"
      >
        <div className="mx-auto flex w-full max-w-3xl items-end gap-3 rounded-3xl border border-white/10 bg-[#1a1a1c]/90 px-4 py-3 shadow-lg">
          <input
            value={input}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
            placeholder="무엇이 궁금하신가요?"
            className="h-[52px] flex-1 bg-transparent text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || pending}
            className="flex h-10 items-center rounded-full bg-emerald-500 px-5 text-sm font-medium text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            보내기
          </button>
        </div>
        <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-zinc-500">
          데모 UI만 제공하며, 실제 응답은 고정된 메시지로 대체됩니다.
        </p>
      </form>
    </div>
  );
}

