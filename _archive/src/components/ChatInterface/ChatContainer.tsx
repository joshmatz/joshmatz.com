import { useRef, useEffect } from "react";
import { useChat, Message } from "@ai-sdk/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageRenderer } from "./MessageRenderer";

export function ChatContainer() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "Hi! I'm Josh's AI assistant. I can tell you about Josh, his work, blog posts, and more. What would you like to know?",
        parts: [
          {
            type: "text",
            text: "Hi! I'm Josh's AI assistant. I can tell you about Josh, his work, blog posts, and more. What would you like to know?",
          },
        ],
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handler for clicking a blog post in the list
  const handleBlogPostSelect = (slug: string) => {
    setInput(`Tell me about the blog post: ${slug}`);
  };

  // Function to check if any tool invocation is currently loading
  const hasPendingToolInvocations = (message: Message): boolean => {
    if (!message.parts) return false;
    const toolResultsMap = new Map<string, boolean>();

    // Mark results as seen, using nested structure
    for (const part of message.parts) {
      if (part.type === "tool-result") {
        const toolResult = (part as any).toolResult;
        if (toolResult && typeof toolResult.toolCallId === "string") {
          toolResultsMap.set(toolResult.toolCallId, true);
        }
      }
    }

    // Check if any invocation lacks a result, using nested structure
    for (const part of message.parts) {
      if (part.type === "tool-invocation") {
        const toolInvocation = (part as any).toolInvocation;
        if (
          toolInvocation &&
          typeof toolInvocation.toolCallId === "string" &&
          !toolResultsMap.has(toolInvocation.toolCallId)
        ) {
          return true; // Found a pending invocation
        }
      }
    }
    return false;
  };

  const isAnyToolLoading = messages.some(hasPendingToolInvocations);

  return (
    <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="text-xl font-medium">
          Chat with Josh Matz&apos;s AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        <div className="flex flex-col">
          {messages
            .filter((m: Message) => m.role === "user" || m.role === "assistant")
            .map((m: Message) => (
              <MessageRenderer
                key={m.id}
                message={m}
                onSelectPost={handleBlogPostSelect}
              />
            ))}

          {isLoading && !isAnyToolLoading && (
            <div className="flex w-full justify-start p-4">
              <div className="flex max-w-[80%] items-center gap-2 rounded-lg bg-muted p-4">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <span className="text-xs opacity-70">AI is typing...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex w-full justify-center p-4">
              <div className="rounded-md border border-red-400 bg-red-100 p-3 text-red-700">
                <p className="text-sm font-medium">Error:</p>
                <p className="text-sm">{error.message}</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="p-0 w-full border-t">
        <form onSubmit={handleSubmit} className="w-full flex">
          <input
            className="flex-1 px-4 py-3 rounded-none focus:outline-none dark:bg-zinc-800"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            disabled={isLoading || !!error}
          />
          <button
            type="submit"
            disabled={isLoading || !!error}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}
