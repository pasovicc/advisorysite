# Executive Advisory

Premium Next.js website for an executive consulting brand focused on AI governance, digital transformation, project management, IT governance, banking IT and education.

## Stack

- Next.js App Router
- Tailwind CSS
- Content-first structure in `src/content`
- CMS-ready content layer in `src/lib/cms.ts`
- Sanity schema definitions in `src/cms/sanity/schema.ts`
- AI advisor system prompt in `src/content/ai/system-prompt.ts`
- AI advisor API route in `src/app/api/ai-advisor/route.ts`

## Local Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when connecting booking and assistant services.

The AI assistant works without an API key using predefined fallback responses. To connect a live model later, set the provider key and model environment variables.
