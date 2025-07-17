import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Bell, X, Shield } from "lucide-react";
import NotificationCard, {
  type Notification,
} from "@/components/notification-card";

export default function NotificationDrawer() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "error",
      title: "Firewall Breach Attempt",
      message:
        "Blocked unauthorized access attempt to restricted port 22 from IP 203.0.113.45. Rule triggered: 'Block External SSH'.",
      time: "2 minutes ago",
      status: "unread",
    },
    {
      id: 2,
      type: "warning",
      title: "Privileged Access Request",
      message:
        "User user_453 has requested admin access to the production firewall. Approval pending.",
      time: "6 minutes ago",
      status: "unread",
    },
    {
      id: 3,
      type: "info",
      title: "New Firewall Rule Deployed",
      message:
        "Access control rule 'BlockOutboundSMTP-Ext' successfully deployed to all network edge firewalls.",
      time: "10 minutes ago",
      status: "unread",
    },
    {
      id: 4,
      type: "warning",
      title: "Suspicious Privilege Escalation",
      message:
        "Unusual sudo usage detected on SRV-APP-03 by user user_198. Activity flagged for review.",
      time: "15 minutes ago",
      status: "unread",
    },
    {
      id: 5,
      type: "success",
      title: "VPN Access Revoked",
      message:
        "Expired contractor VPN access successfully removed from user user_602 after policy audit.",
      time: "1 hour ago",
      status: "read",
    },
    {
      id: 6,
      type: "error",
      title: "DLP Violation Detected",
      message:
        "Blocked outgoing email containing sensitive project files. User: rajeev@company.com. Action logged.",
      time: "2 hours ago",
      status: "read",
    },
  ]);

  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, status: "read" })));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-full max-w-md ml-auto bg-background">
        <div className="flex flex-col h-full">
          <DrawerHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-semibold text-foreground">
                Notifications
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
            <div className="flex items-center justify-between">
              <DrawerDescription className="text-sm text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} unread notifications`
                  : "All notifications read"}
              </DrawerDescription>
              <div className="min-w-0 flex-shrink-0">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3 p-4">
              {notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={markAsRead}
                />
              ))}
            </div>
          </div>

          <DrawerFooter className="border-t border-border bg-muted/30">
            <Button variant="outline" className="w-full">
              <Shield className="w-4 h-4 mr-2" />
              View All Notifications
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
