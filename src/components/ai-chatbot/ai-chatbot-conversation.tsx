"use client";

import { useEffect } from "react";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@/components/ui/kibo-ui/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
  AIMessageTimestamp,
  AIMessageTimestampContainer,
} from "@/components/ui/kibo-ui/ai/message";
import { AIResponse } from "@/components/ui/kibo-ui/ai/response";
import { useAIChatbotStore } from "@/store/ai-chatbot-store";
import { Loader } from "@/components/ui/loader";

export default function AIChatbotConversation() {
  const { conversation, isTyping } = useAIChatbotStore();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    const scrollToBottom = () => {
      const element = document.querySelector("[data-conversation-content]");
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [conversation, isTyping]);

  return (
    <AIConversation className="relative size-full rounded-lg border">
      <AIConversationContent data-conversation-content>
        {conversation.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">
              Start a conversation by typing a message below...
            </p>
          </div>
        ) : (
          conversation.map((message) => (
            <AIMessage from={message.from} key={message.id}>
              <AIMessageTimestampContainer>
                <AIMessageContent>
                  {message.from === "user" ? (
                    message.content
                  ) : (
                    <AIResponse>
                      {message.content + (message.isStreaming ? "|" : "")}
                    </AIResponse>
                  )}
                </AIMessageContent>
                {message.timestamp && (
                  <AIMessageTimestamp timestamp={message.timestamp} />
                )}
              </AIMessageTimestampContainer>
            </AIMessage>
          ))
        )}

        {/* Show typing indicator when AI is responding */}
        {isTyping && (
          <AIMessage from="assistant">
            <AIMessageContent>
              <div className="flex items-center gap-2">
                <Loader size="sm" />
                <span>Thinking...</span>
              </div>
            </AIMessageContent>
          </AIMessage>
        )}
      </AIConversationContent>
      <AIConversationScrollButton />
    </AIConversation>
  );
}
