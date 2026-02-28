// This file is needed to validate environment variables at server startup
import { validateAndGetServerEnv } from "./lib/env";

export async function register() {
  // Only run in server environment
  if (typeof window === "undefined") {
    try {
      // Validate server environment variables on startup
      validateAndGetServerEnv();
      console.info("✅ Server environment variables are valid");
    } catch (error) {
      // Log error and potentially exit if environment variables are invalid
      console.error("Failed to validate server environment variables:", error);
      // In production, you might want to exit the process forcefully
      // process.exit(1);
      // Rethrowing might be sufficient for Next.js to halt startup
      throw error;
    }
  }
}
