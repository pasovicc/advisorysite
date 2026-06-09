import { NextResponse } from "next/server";
import { aiAdvisorSystemPrompt } from "@/content/ai/system-prompt";
import { getFallbackResponse } from "@/lib/ai/fallbackResponses";
import { enforceRateLimit } from "@/lib/security/rateLimit";
import { aiAdvisorRequestSchema } from "@/lib/validation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function latestUserMessage(messages: ChatMessage[] = []) {
  return [...messages].reverse().find((message) => message.role === "user")?.content || "";
}

function fallbackReply(question: string) {
  return NextResponse.json({
    reply: getFallbackResponse(question),
    mode: "fallback"
  });
}

export async function POST(request: Request) {
  const limited = enforceRateLimit(request, "ai-advisor", {
    limit: 12,
    windowMs: 60_000
  });

  if (limited) {
    return limited;
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = aiAdvisorRequestSchema.safeParse(rawBody);

  if (!parsed.success) {
    return NextResponse.json({ error: "Please send a valid question." }, { status: 400 });
  }

  const body = parsed.data as { messages?: ChatMessage[]; question?: string };

  const question = body?.question || latestUserMessage(body?.messages || []);

  if (!question.trim()) {
    return fallbackReply("project management");
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !model) {
    return fallbackReply(question);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: aiAdvisorSystemPrompt
          },
          ...(body?.messages || []).map((message) => ({
            role: message.role,
            content: message.content
          }))
        ],
        max_output_tokens: 450
      })
    });

    if (!response.ok) {
      return fallbackReply(question);
    }

    const data = (await response.json()) as { output_text?: string };
    const reply = data.output_text?.trim();

    if (!reply) {
      return fallbackReply(question);
    }

    return NextResponse.json({ reply, mode: "openai" });
  } catch {
    return fallbackReply(question);
  }
}
