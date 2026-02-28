import { z } from "zod";

// Schema for client-side environment variables
// These are accessible in browser and should not contain secrets
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

// Schema for server-side environment variables
// These are only accessible on the server and can contain secrets
export const serverEnvSchema = z.object({
  // AI provider API key - required
  AI_PROVIDER_API_KEY: z.string().min(1, "AI provider API key is required"),

  // Model configuration
  AI_MODEL: z.string().default("gpt-4o"),

  // Optional configuration
  AI_TEMPERATURE: z.coerce.number().min(0).max(2).default(0.7),
  AI_MAX_TOKENS: z.coerce.number().positive().optional(),
});

// Type definitions derived from schemas
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

let validatedServerEnv: ServerEnv | null = null;
let validatedClientEnv: ClientEnv | null = null;

// Function to perform safe parsing and validation for server env
export function validateAndGetServerEnv(): ServerEnv {
  if (validatedServerEnv) {
    return validatedServerEnv;
  }
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const formattedErrors = result.error.errors.map(
      (err) => `${err.path.join(".")}: ${err.message}`
    );
    throw new Error(
      `❌ Invalid server environment variables:\n${formattedErrors.join("\n")}`
    );
  }
  validatedServerEnv = result.data;
  return result.data;
}

// Function to perform safe parsing and validation for client env
export function validateAndGetClientEnv(): ClientEnv {
  if (validatedClientEnv) {
    return validatedClientEnv;
  }
  // Extract only client-side vars for parsing
  const clientProcessEnv = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };
  const result = clientEnvSchema.safeParse(clientProcessEnv);
  if (!result.success) {
    const formattedErrors = result.error.errors.map(
      (err) => `${err.path.join(".")}: ${err.message}`
    );
    throw new Error(
      `❌ Invalid client environment variables:\n${formattedErrors.join("\n")}`
    );
  }
  validatedClientEnv = result.data;
  return result.data;
}

// Extend ProcessEnv interface with our env variables
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends ServerEnv, ClientEnv {}
  }
}
