import { createOpenAI } from "@ai-sdk/openai";
import { validateAndGetServerEnv } from "./env";

// Get validated server environment variables
// This should be safe as instrumentation would have thrown an error on startup if invalid
const serverEnv = validateAndGetServerEnv();

// Create OpenAI provider instance
export const openaiProvider = createOpenAI({
  apiKey: serverEnv.AI_PROVIDER_API_KEY,
  // compatibility: 'strict' // Adjust compatibility mode if needed
});

// Define a function to get a specific model instance from the provider
export const getOpenAIModel = (modelName: string = serverEnv.AI_MODEL) => {
  return openaiProvider.chat(modelName);
};

// Export model settings separately for potential use elsewhere
export const openaiModelSettings = {
  temperature: serverEnv.AI_TEMPERATURE,
  maxTokens: serverEnv.AI_MAX_TOKENS,
};

// You can add more model configurations as needed
// For example:
// export const anthropicModel = anthropic(...);
// export const googleModel = google(...);
