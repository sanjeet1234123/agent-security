"use client";

import { type FormEventHandler, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  Activity,
  AlertTriangle,
  Brain,
  TrendingUp,
} from "lucide-react";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/kibo-ui/ai/input";
import { useAIChatbotStore } from "@/store/ai-chatbot-store";
import { Button } from "../ui/button";

const socketUrl = `${process.env.NEXT_PUBLIC_WS_URL}/api/message`;

// WebSocket response type
interface WebSocketResponse {
  senderType?: string;
  text?: string;
  message?: string;
  timestamp?: string;
}

// Suggestion categories and their prompts
const suggestions = {
  Insights: [
    {
      label: "Most common incident categories last 3 days?",
      prompt:
        "Provide a breakdown of the most frequent incident categories over the past 3 days. Include incident category names along with the respective counts. Present the results in descending order of frequency.",
    },
    {
      label: "Severity with most open incidents?",
      prompt:
        "Identify the severity level that has the highest number of open incidents. Provide a detailed count of incidents by severity and list the severity level with the most open incidents.",
    },
    {
      label: "Average time for Critical incidents?",
      prompt:
        "Calculate the average time it takes to resolve Critical severity incidents. Provide the average time in hours or days and show the detailed breakdown of individual incidents' resolution times.",
    },
    {
      label: "Categories with highest Contained disposition?",
      prompt:
        "List the incident categories with the highest number of incidents that have a Contained disposition. Display the number of incidents in each category and sort them by frequency.",
    },
  ],
  Incidents: [
    {
      label: "Critical incidents in Needs Review?",
      prompt:
        "List all Critical severity incidents that are currently in the 'Needs Review' status. Provide incident IDs, creation dates, and any additional notes or fields that could be useful.",
    },
    {
      label: "Details of Sensitive Data incidents?",
      prompt:
        "Provide detailed information on all Sensitive Data Exposure incidents. Include incident IDs, timestamps, severity, current status, and any remediation steps taken so far.",
    },
    {
      label: "Incidents recorded compared to yesterday",
      prompt:
        "Compare the number of incidents recorded today with the number recorded yesterday. Provide the total number of incidents for each day and highlight any significant changes in incident volume.",
    },
    {
      label: "Incidents with Cleared disposition?",
      prompt:
        "List incidents that have a Cleared disposition. Include incident categories, severity, and the resolution date to determine how long it took for incidents to be cleared.",
    },
  ],
  Trends: [
    {
      label: "Trend for Sensitive Data Exposure?",
      prompt:
        "Show the trend for Sensitive Data Exposure incidents over the past week. Display the number of incidents each day and provide a comparison to previous periods to understand if the trend is increasing or decreasing.",
    },
    {
      label: "Frequency of Unauthorized Access incidents?",
      prompt:
        "Analyze the frequency of Unauthorized Access incidents for the past month. Include the daily counts and highlight any peaks in incidents. Identify if any specific period had a higher frequency.",
    },
    {
      label: "Critical severity trend in this week?",
      prompt:
        "Track the trend for Critical severity incidents throughout this week. Show the daily counts for Critical incidents and analyze if there is a particular trend or pattern.",
    },
    {
      label: "Misconfiguration incidents trend last two weeks?",
      prompt:
        "Present the trend for Misconfiguration incidents over the last two weeks. Show the daily counts, identify any patterns or spikes in incidents, and analyze if there are any recurring themes.",
    },
  ],
  Audit: [
    {
      label: "Generate AWS resource audit report.",
      prompt:
        "Generate a comprehensive audit report for all AWS resources. Include information on resource types, usage statistics, configurations, and any potential vulnerabilities or compliance issues.",
    },
    {
      label: "Generate audit report for possible incidents.",
      prompt:
        "Generate an audit report for all potential incidents, categorizing them by risk level and providing detailed descriptions of each incident. Ensure to highlight possible misconfigurations or security weaknesses that could lead to incidents.",
    },
  ],
};

// Function to check if a message should be displayed
const shouldDisplayMessage = (response: WebSocketResponse) => {
  if (
    response.senderType === "system" ||
    response.text?.startsWith("Tool Response") ||
    response.text?.startsWith("Tool Call:")
  ) {
    return false;
  }
  return true;
};

// Function to tokenize text for streaming effect
const tokenizeText = (text: string): string[] => {
  const tokens: string[] = [];
  let currentToken = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === "*" || char === "_" || char === "`" || char === "#") {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char);
    } else if (char === " " || char === "\n") {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char);
    } else if (".,!?;:()[]{}\"'-".includes(char)) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char);
    } else {
      currentToken += char;
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  return tokens;
};

export default function AIChatbotInput() {
  const [text, setText] = useState<string>("");
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const {
    addMessage,
    addStreamingMessage,
    updateStreamingMessage,
    finalizeStreamingMessage,
    setTyping,
  } = useAIChatbotStore();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      onOpen: () => {
        console.log("WebSocket connection opened");
      },
      onClose: () => {
        console.log("WebSocket connection closed");
      },
      onError: (error) => {
        console.error("WebSocket error:", error);
        setStatus("error");
      },
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: 3000,
    }
  );

  useEffect(() => {
    if (lastJsonMessage) {
      try {
        const response = lastJsonMessage as WebSocketResponse;

        if (!shouldDisplayMessage(response)) {
          return;
        }

        const messageText = response.text || response.message || "";
        if (messageText) {
          const messageId = Date.now().toString();
          const tokens = tokenizeText(messageText);

          addStreamingMessage(messageId, "assistant");
          setTyping(false);

          let currentContent = "";
          let index = 0;

          const streamInterval = setInterval(() => {
            if (index < tokens.length) {
              currentContent += tokens[index];
              updateStreamingMessage(messageId, currentContent);
              index++;
            } else {
              clearInterval(streamInterval);
              finalizeStreamingMessage(messageId);
              setStatus("ready");
            }
          }, 30);
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
        setStatus("error");
        setTyping(false);
      }
    }
  }, [
    lastJsonMessage,
    addStreamingMessage,
    updateStreamingMessage,
    finalizeStreamingMessage,
    setTyping,
  ]);

  useEffect(() => {
    if (readyState === ReadyState.CLOSED) {
      setStatus("error");
      setTyping(false);
    } else if (readyState === ReadyState.OPEN) {
      setStatus("ready");
    }
  }, [readyState, setTyping]);

  const getConnectionStatus = () => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        return "Connecting...";
      case ReadyState.OPEN:
        return "Connected";
      case ReadyState.CLOSING:
        return "Closing...";
      case ReadyState.CLOSED:
        return "Disconnected";
      default:
        return "Not connected";
    }
  };

  const getConnectionStatusColor = () => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        return "text-yellow-500";
      case ReadyState.OPEN:
        return "text-green-500";
      case ReadyState.CLOSING:
        return "text-orange-500";
      case ReadyState.CLOSED:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!text.trim() || readyState !== ReadyState.OPEN) {
      return;
    }

    addMessage(text, "user");
    const userMessage = text;
    setText("");
    setActiveCategory(null);

    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
      setTyping(true);
    }, 200);

    try {
      sendJsonMessage({
        text: userMessage,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setStatus("error");
      setTyping(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    if (readyState !== ReadyState.OPEN) return;

    setActiveCategory(null);
    setText("");

    addMessage(prompt, "user");

    setStatus("submitted");
    setTimeout(() => {
      setStatus("streaming");
      setTyping(true);
    }, 200);

    try {
      sendJsonMessage({
        text: prompt,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send suggestion message:", error);
      setStatus("error");
      setTyping(false);
    }
  };

  return (
    <div className="suggestion">
      <div className="suggestion-wrapper p-4">
        {activeCategory && (
          <div className="flex flex-col gap-2 fade-in-slow">
            {suggestions[activeCategory as keyof typeof suggestions].map(
              ({ label, prompt }, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto py-2 px-3 text-sm"
                  onClick={() => handleSuggestionClick(prompt)}
                >
                  {label}
                </Button>
              )
            )}
          </div>
        )}
      </div>
      <AIInput onSubmit={handleSubmit}>
        <AIInputTextarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder={
            readyState === ReadyState.OPEN
              ? "Type your message..."
              : "Connecting to chatbot..."
          }
        />
        <AIInputToolbar>
          <AIInputTools>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="gradient"
                      size="icon"
                      onClick={() => setActiveCategory("Insights")}
                    >
                      <Brain size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Insights</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="gradient"
                      size="icon"
                      onClick={() => setActiveCategory("Incidents")}
                    >
                      <AlertTriangle size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Incidents</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="gradient"
                      size="icon"
                      onClick={() => setActiveCategory("Trends")}
                    >
                      <TrendingUp size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Trends</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="gradient"
                      size="icon"
                      onClick={() => setActiveCategory("Audit")}
                    >
                      <Activity size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Audits</TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div
                  className={`w-2 h-2 rounded-full ${readyState === ReadyState.OPEN
                      ? "bg-green-500"
                      : readyState === ReadyState.CONNECTING
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                ></div>
                <span className={`${getConnectionStatusColor()} font-medium`}>
                  {getConnectionStatus()}
                </span>
              </div>
            </div>
          </AIInputTools>
          <AIInputSubmit
            disabled={!text || readyState !== ReadyState.OPEN}
            status={status}
          />
        </AIInputToolbar>
      </AIInput>
    </div>
  );
}