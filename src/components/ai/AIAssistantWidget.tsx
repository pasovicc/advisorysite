"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { homeContent } from "@/content/site";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AIAssistantWidgetProps = {
  defaultOpen?: boolean;
  className?: string;
  fixed?: boolean;
};

const initialMessage: Message = {
  role: "assistant",
  content: "Hi, I am Advisory AI. Ask me about PMO, AI governance, DORA or digital transformation."
};

export function AIAssistantWidget({
  defaultOpen = false,
  className = "",
  fixed = false
}: AIAssistantWidgetProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const examples = useMemo(() => homeContent.assistant.examples, []);

  async function submitQuestion(question: string) {
    const trimmed = question.trim();

    if (!trimmed || loading) {
      return;
    }

    setOpen(true);
    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });

      const data = (await response.json()) as { reply?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.reply ||
            "I can give a general answer, but this topic needs more context for useful guidance."
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I cannot reach the advisor service right now. Try again, or book a consultation for organization-specific guidance."
        }
      ]);
    } finally {
      setLoading(false);
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitQuestion(input);
  }

  return (
    <div
      data-ai-widget="true"
      className={
        fixed
          ? `fixed bottom-4 right-4 z-[80] h-16 w-16 sm:bottom-6 sm:right-6 ${className}`
          : `relative min-h-[520px] ${className}`
      }
    >
      <div
        aria-hidden={!open}
        className={`absolute bottom-20 right-0 z-10 flex h-[min(640px,calc(100vh-112px))] w-[min(410px,calc(100vw-24px))] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-premium transition duration-300 ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-navy px-4 py-4 text-white">
          <div className="flex items-center gap-3">
            <AssistantAvatar />
            <div>
              <p className="text-sm font-extrabold">Advisory AI</p>
              <p className="text-xs text-slate-300">Project / Governance / Transformation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-md text-slate-200 transition hover:bg-white/10 hover:text-white"
            aria-label="Minimize Advisory AI"
          >
            <Icon name="X" className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-porcelain p-4 md:p-5">
          <div className="grid gap-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content}`}
                className={`animate-softSlide flex items-end gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" ? <AssistantAvatar small /> : null}
                <div
                  className={`max-w-[86%] rounded-lg px-4 py-3 text-sm leading-6 shadow-sm md:text-[15px] ${
                    message.role === "user"
                      ? "bg-navy text-white"
                      : "border border-slate-200 bg-white text-graphite"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="animate-softSlide flex items-end gap-2">
                <AssistantAvatar small />
                <div className="flex gap-1 rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold" />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2 border-t border-slate-200 bg-white p-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {examples.map((example) => (
              <button
                type="button"
                key={example}
                onClick={() => void submitQuestion(example)}
                className="shrink-0 rounded-full border border-slate-200 bg-porcelain px-3 py-1.5 text-xs font-bold text-graphite transition hover:border-gold/70 hover:bg-white hover:text-navy"
              >
                {example}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onInput={(event) => setInput(event.currentTarget.value)}
              placeholder="Ask a question..."
              className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy outline-none transition placeholder:text-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-navy transition hover:bg-[#d7bc84] disabled:cursor-not-allowed disabled:bg-slate-300"
              aria-label="Send message"
            >
              <Icon name="Send" className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="absolute bottom-0 right-0 z-20 flex items-center gap-3 rounded-full border border-white/40 bg-white px-3 py-3 text-left text-navy shadow-[0_18px_48px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_22px_58px_rgba(15,23,42,0.34)]"
        aria-expanded={open}
        aria-label={open ? "Close Advisory AI" : "Open Advisory AI"}
      >
        <AssistantAvatar />
        <span className="hidden pr-2 text-sm font-extrabold sm:block">Advisory AI</span>
      </button>
    </div>
  );
}

function AssistantAvatar({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gold text-navy shadow-sm ${
        small ? "h-8 w-8" : "h-11 w-11"
      }`}
    >
      <Icon name="Sparkles" className={small ? "h-4 w-4" : "h-5 w-5"} />
    </span>
  );
}
