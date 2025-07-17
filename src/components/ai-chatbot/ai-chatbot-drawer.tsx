import { useState } from "react";
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
import AIChatbotButton from "./ai-chatbot-button";
import AIChatbotInput from "./ai-chatbot-input";
import { Button } from "@/components/ui/button";
import { IconSparkles } from "@tabler/icons-react";
import AIChatbotConversation from "./ai-chatbot-conversation";
import { useAIChatbotStore } from "@/store/ai-chatbot-store";

export function AIChatbotDrawer() {
  const { clearConversation } = useAIChatbotStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpenChange = (open: boolean) => {
    console.log("Drawer state changed:", open);
    setIsOpen(open);
    if (!open) {
      // Clear conversation when drawer closes
      clearConversation();
    }
  };

  return (
    <Drawer
      direction="right"
      modal={false}
      dismissible={false}
      open={isOpen}
      onOpenChange={handleDrawerOpenChange}
    >
      <DrawerTrigger asChild>
        <AIChatbotButton />
      </DrawerTrigger>
      <DrawerContent className="h-full w-full !max-w-[600px] ml-auto bg-background shadow-xl">
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
            <AIChatbotInput />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
