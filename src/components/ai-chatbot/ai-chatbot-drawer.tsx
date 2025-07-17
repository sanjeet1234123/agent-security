import { useState, useRef } from "react";
import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import AIChatbotButton from "./ai-chatbot-button"; // No longer needed
import AIChatbotInput from "./ai-chatbot-input";
import { Button } from "@/components/ui/button";
import { IconSparkles } from "@tabler/icons-react";
import AIChatbotConversation from "./ai-chatbot-conversation";
import { useAIChatbotStore } from "@/store/ai-chatbot-store";

export function AIChatbotDrawer() {
  const { clearConversation } = useAIChatbotStore();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<any>(null);

  // Called when user sends a message from the always-visible input
  const handleInputSend = () => {
    setIsOpen(true);
    // Optionally, focus the input in the drawer after opening
    setTimeout(() => {
      if (inputRef.current && inputRef.current.focus) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleDrawerOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      clearConversation();
    }
  };

  return (
    <>
      {/* Always-visible input in bottom right, hidden when drawer is open */}
      {!isOpen && (
        <div
          className="fixed bottom-10 z-[60] w-[550px] max-w-[90vw] shadow-xl -translate-x-1/2"
          style={{ left: "calc(50% + 64px)" }}
        >
          <AIChatbotInput onFirstMessage={handleInputSend} inputRef={inputRef} />
        </div>
      )}
      <Drawer
        direction="top"
        modal={false}
        dismissible={false}
        open={isOpen}
        onOpenChange={handleDrawerOpenChange}
      >
        {/* No trigger, open is controlled by state */}
        <DrawerContent className="h-full w-full max-w-none ml-0 bg-background shadow-xl">
          <div className="flex flex-col h-full">
            <DrawerHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2  [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400">
                  <IconSparkles
                    stroke={1.5}
                    size={28}
                    className="flex-shrink-0"
                  />
                  <DrawerTitle className="text-xl font-semibold text-foreground">
                    Ask AgentSOC Assistant
                  </DrawerTitle>
                </div>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleDrawerOpenChange(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
              <DrawerDescription>
                Interact with the AgentSOC to get answers and assistance.
              </DrawerDescription>
            </DrawerHeader>

            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              <AIChatbotConversation />
            </div>

            <DrawerFooter className="border-t border-border bg-muted/30">
              {/* Input inside drawer, only when open */}
              <AIChatbotInput inputRef={inputRef} />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
