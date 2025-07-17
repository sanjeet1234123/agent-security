import { create } from "zustand";

export interface ChatMessage {
  id: string;
  content: string;
  from: "user" | "assistant";
  timestamp: number;
  isStreaming?: boolean;
}

interface AIChatbotStore {
  conversation: ChatMessage[];
  isTyping: boolean;
  addMessage: (content: string, from: "user" | "assistant") => void;
  addStreamingMessage: (id: string, from: "user" | "assistant") => void;
  updateStreamingMessage: (id: string, content: string) => void;
  finalizeStreamingMessage: (id: string) => void;
  clearConversation: () => void;
  setTyping: (typing: boolean) => void;
}

export const useAIChatbotStore = create<AIChatbotStore>((set) => ({
  conversation: [],
  isTyping: false,

  addMessage: (content: string, from: "user" | "assistant") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      from,
      timestamp: Date.now(),
    };
    set((state) => ({
      conversation: [...state.conversation, newMessage],
    }));
  },

  addStreamingMessage: (id: string, from: "user" | "assistant") => {
    const newMessage: ChatMessage = {
      id,
      content: "",
      from,
      timestamp: Date.now(),
      isStreaming: true,
    };
    set((state) => ({
      conversation: [...state.conversation, newMessage],
    }));
  },

  updateStreamingMessage: (id: string, content: string) => {
    set((state) => ({
      conversation: state.conversation.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    }));
  },

  finalizeStreamingMessage: (id: string) => {
    set((state) => ({
      conversation: state.conversation.map((msg) =>
        msg.id === id ? { ...msg, isStreaming: false } : msg
      ),
    }));
  },

  clearConversation: () => {
    set({ conversation: [], isTyping: false });
  },

  setTyping: (typing: boolean) => {
    set({ isTyping: typing });
  },
}));
