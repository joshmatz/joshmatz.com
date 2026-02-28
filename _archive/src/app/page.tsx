"use client";

import { ChatContainer } from "@/components/ChatInterface/ChatContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          Josh Matz - Personal Website
        </h1>
        <ChatContainer />
      </div>
    </main>
  );
}
