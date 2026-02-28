import { streamText } from "ai";
import { getOpenAIModel, openaiModelSettings } from "@/lib/ai-config";
import { Message } from "@ai-sdk/react";
import { tools } from "@/ai/tools"; // Import the tools (now with execute functions)
// import { z } from 'zod'; // Not needed here as parameters are defined in tools.ts

// Server env vars are validated at startup by instrumentation.ts
// No need to call validateEnv() here again

// Allow streaming responses for up to 30 seconds
export const maxDuration = 30;

// Define the request handler for the chat API endpoint
export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const model = getOpenAIModel();

  // Updated system prompt to be more concise about capabilities
  const systemPrompt = `You are a helpful AI assistant for Josh Matz's personal website. 
  You can provide information about Josh, his work (portfolio, MEA Timeline), blog posts, and social links using available tools.`;

  const streamTextResult = await streamText({
    model: model,
    system: systemPrompt,
    messages,
    temperature: openaiModelSettings.temperature,
    maxTokens: openaiModelSettings.maxTokens,
    tools: tools, // Pass the imported tools object directly
  });

  return streamTextResult.toDataStreamResponse();
}
