"use client";

import * as React from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { IconAlertOctagon, IconLayoutDashboard } from "@tabler/icons-react";

const data = {
  user: {
    name: "XenonStack",
    email: "demo@xenonstack.com",
  },
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: IconLayoutDashboard,
      isActive: true,
    },
    {
      title: "Incidents",
      url: "/incident",
      icon: IconAlertOctagon,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <Sidebar
      variant="inset"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <ViewTransition>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.url)}
                      tooltip={item.title}
                      onClick={() => handleNavigation(item.url)}
                      className="cursor-pointer"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </ViewTransition>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
