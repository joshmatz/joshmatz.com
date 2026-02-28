# AI SDK Integration for joshmatz.com

This document explains how to set up and use the AI SDK integration for the joshmatz.com chat interface.

## Environment Variables

The application uses environment variables for configuration, which are validated using Zod. You need to create a `.env.local` file in the root directory with the following variables:

```
# Copy from env.local.example to .env.local and fill in your values
cp env.local.example .env.local
```

Then edit the `.env.local` file to add your API key and adjust the other settings as needed.

### Required Environment Variables

- `AI_PROVIDER_API_KEY`: Your OpenAI API key (or other provider)

### Optional Environment Variables

- `AI_MODEL`: Model name (defaults to "gpt-4o")
- `AI_TEMPERATURE`: Controls randomness in responses (0-2, defaults to 0.7)
- `AI_MAX_TOKENS`: Maximum tokens to generate per response
- `NEXT_PUBLIC_SITE_URL`: Your website URL (for client-side use)

## Development

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

## How It Works

The AI integration uses the Vercel AI SDK to create a chat interface that:

1. Validates environment variables at server startup using Zod
2. Uses the AI SDK for streaming responses
3. Implements client-side components with the `useChat` hook

### Key Files

- `src/lib/env.ts`: Environment variable validation schemas
- `src/lib/env-check.ts`: Environment validation functions
- `src/lib/ai-config.ts`: AI model configuration
- `src/app/api/chat/route.ts`: API endpoint for chat
- `src/components/ChatInterface/ChatContainer.tsx`: Chat UI component

## Adding New AI Features

To add new AI features:

1. Update the chat API in `src/app/api/chat/route.ts` to include new tools or capabilities
2. Modify the chat container component to utilize new features
3. Add any new environment variables to the schema in `src/lib/env.ts`

## Troubleshooting

If you encounter issues with environment variables, check the console output when starting the server. The application will display detailed error messages about missing or invalid variables. 