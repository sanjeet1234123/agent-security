"use client";

import * as React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ArrowUp, Paperclip } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ChatInput() {
  const [value, setValue] = React.useState("");

  return (
    <div className="flex flex-col gap-4 border-input rounded-2xl border px-3 py-3 shadow-xs dark:bg-input/30 w-full">
      <Textarea
        variant="unstyled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autosize
        minRows={1}
        maxRows={4}
        placeholder="Message"
        className="w-full"
        // disabled={isLoading}
      />
      <div className="flex justify-between gap-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative cursor-pointer"
            >
              <Paperclip className="-rotate-45" />
              <span className="sr-only">Attachment</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Attachment</p>
          </TooltipContent>
        </Tooltip>

        <Button
          variant="black"
          size="icon"
          className="relative cursor-pointer hover:scale-110 transition-transform duration-200 ease-in-out"
        >
          <ArrowUp />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
