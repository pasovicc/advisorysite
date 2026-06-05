# Jasna Executive Advisory

Premium Next.js website for an executive consulting brand focused on AI governance, digital transformation, project management, IT governance, banking IT and education.

## Stack

- Next.js App Router
- Tailwind CSS
- Content-first structure in `src/content`
- CMS placeholder layer in `src/lib/cms.ts`
- Sanity schema placeholders in `src/cms/sanity/schema.ts`
- AI advisor system prompt in `src/content/ai/system-prompt.ts`
- OpenAI-ready API route in `src/app/api/ai-advisor/route.ts`

## Local Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when connecting Calendly or OpenAI.

The AI assistant works without an API key using predefined fallback responses. To connect OpenAI later, set both `OPENAI_API_KEY` and `OPENAI_MODEL`.
