import React, { useMemo } from "react";
import { Message } from "@ai-sdk/react";
import { ChatMessage } from "./ChatMessage";
import { AboutCard } from "../GenerativeUI/AboutCard";
import { SocialLinksList } from "../GenerativeUI/SocialLinksList";
import { PortfolioDisplay } from "../GenerativeUI/PortfolioDisplay";
import { MEATimelineInfo } from "../GenerativeUI/MEATimelineInfo";
import { BlogPostList } from "../GenerativeUI/BlogPostList";

interface MessageRendererProps {
  message: Message;
  onSelectPost: (slug: string) => void;
}

export const MessageRenderer: React.FC<MessageRendererProps> = ({
  message,
  onSelectPost,
}) => {
  // Process parts within useMemo
  const processedParts = useMemo(() => {
    const textParts: string[] = [];
    const toolUIElements: { [toolCallId: string]: React.ReactNode } = {};
    const toolResultsMap = new Map<string, any>();

    const parts = message.parts || [];

    // First pass: Collect text and map results
    for (const part of parts) {
      if (part.type === "text") {
        textParts.push((part as any).text);
      } else if (part.type === "tool-result") {
        // Access nested properties
        const toolResult = (part as any).toolResult;
        if (toolResult && typeof toolResult.toolCallId === "string") {
          toolResultsMap.set(toolResult.toolCallId, toolResult.result);
        }
      }
    }

    // Second pass: Generate UI for tool invocations
    for (const part of parts) {
      if (part.type === "tool-invocation") {
        // Access nested properties
        const toolInvocation = (part as any).toolInvocation;
        if (!toolInvocation) {
          console.error(
            "Skipping tool invocation part due to missing toolInvocation object:",
            part
          );
          continue;
        }

        const toolCallId = toolInvocation.toolCallId;
        const toolName = toolInvocation.toolName;

        // Ensure toolCallId and toolName are strings before proceeding
        if (typeof toolCallId !== "string" || typeof toolName !== "string") {
          console.error(
            "Skipping tool invocation part due to missing/invalid nested properties:",
            part
          );
          continue;
        }

        const result = toolResultsMap.get(toolCallId);

        if (result === undefined) {
          // Result not yet available, show loading
          let loadingMessage = "Loading...";
          switch (toolName) {
            case "displayAboutInfo":
              loadingMessage = "Loading About info...";
              break;
            case "displaySocialLinks":
              loadingMessage = "Loading Social Links...";
              break;
            case "displayPortfolio":
              loadingMessage = "Loading Portfolio...";
              break;
            case "displayMEATimeline":
              loadingMessage = "Loading MEA Timeline info...";
              break;
            case "listBlogPosts":
              loadingMessage = "Loading Blog Posts...";
              break;
          }
          toolUIElements[toolCallId] = (
            <div
              key={`${toolCallId}-loading`}
              className="text-sm italic text-gray-500 p-2"
            >
              {loadingMessage}
            </div>
          );
        } else {
          // Result is available, render component or error
          const resultIsError =
            typeof result === "object" && result !== null && "error" in result;

          if (resultIsError) {
            const errorResult = result as { error: unknown };
            toolUIElements[toolCallId] = (
              <div
                key={`${toolCallId}-error`}
                className="text-red-500 text-sm p-2 bg-red-100 border border-red-300 rounded"
              >
                Tool Error: {String(errorResult.error)}
              </div>
            );
          } else {
            // Keep using `result as any` for child components
            switch (toolName) {
              case "displayAboutInfo":
                toolUIElements[toolCallId] = (
                  <AboutCard key={toolCallId} result={result as any} />
                );
                break;
              case "displaySocialLinks":
                toolUIElements[toolCallId] = (
                  <SocialLinksList key={toolCallId} result={result as any} />
                );
                break;
              case "displayPortfolio":
                toolUIElements[toolCallId] = (
                  <PortfolioDisplay key={toolCallId} result={result as any} />
                );
                break;
              case "displayMEATimeline":
                toolUIElements[toolCallId] = (
                  <MEATimelineInfo key={toolCallId} result={result as any} />
                );
                break;
              case "listBlogPosts":
                toolUIElements[toolCallId] = (
                  <BlogPostList
                    key={toolCallId}
                    result={result as any}
                    onSelectPost={onSelectPost}
                  />
                );
                break;
              default:
                toolUIElements[toolCallId] = (
                  <div
                    key={toolCallId}
                    className="text-sm italic text-gray-500"
                  >
                    Tool {toolName} executed.
                  </div>
                );
            }
          }
        }
      }
    }

    return {
      textContent: textParts.join(""),
      uiElements: Object.values(toolUIElements),
    };
  }, [message.parts, onSelectPost]);

  return (
    <div className="message-wrapper">
      {processedParts.textContent && (
        <ChatMessage
          content={processedParts.textContent}
          role={message.role as "user" | "assistant"}
          timestamp={new Date().toLocaleTimeString()}
        />
      )}
      {message.role === "assistant" && processedParts.uiElements.length > 0 && (
        <div className="generative-ui-container px-4 pb-4 ml-10">
          {processedParts.uiElements}
        </div>
      )}
    </div>
  );
};
