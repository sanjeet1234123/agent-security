"use client";

import { SidebarIcon } from "lucide-react";
import { useTheme } from "next-themes";
// import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ThemeToggle } from "./theme-toggle";
import NotificationDrawer from "./notification-drawer";
import AgentSOCLogoDark from "@/assets/agentsoc-logo-dark.svg";
import AgentSOCLogoWhite from "@/assets/agentsoc-logo-white.svg";
import Image from "next/image";

export function SiteHeader() {
  const { open, toggleSidebar } = useSidebar();
  const { resolvedTheme } = useTheme();

  return (
    <header className="bg-sidebar sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex h-(--header-height) w-full items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  " h-9 w-9",
                  open ? "cursor-w-resize" : "cursor-e-resize"
                )}
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <SidebarIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              <p>{open ? "Collapse Sidebar" : "Expand Sidebar"}</p>
            </TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* resolvedTheme can be undefined during the initial render */}
          <Image
            src={
              resolvedTheme === "light" ? AgentSOCLogoWhite : AgentSOCLogoDark
            }
            alt="AgentSoC"
            className="h-[44px] w-fit"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
          <NotificationDrawer />
          <ThemeToggle iconOnly={true} />
        </div>
      </div>
    </header>
  );
}
