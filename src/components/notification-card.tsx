import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

// Define types for better type safety
export type NotificationType = "error" | "warning" | "info" | "success";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  status: "read" | "unread";
}

interface NotificationCardProps {
  notification: Notification;
  onClick?: (id: number) => void;
}

export default function NotificationCard({
  notification,
  onClick,
}: NotificationCardProps) {
  // Notification type configuration with dark mode support
  const notificationConfig = {
    error: {
      icon: AlertTriangle,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      badgeColor:
        "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
      label: "error",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-orange-500 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      badgeColor:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
      label: "warning",
    },
    info: {
      icon: Info,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      badgeColor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
      label: "info",
    },
    success: {
      icon: CheckCircle,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      badgeColor:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
      label: "success",
    },
  };

  const getStatusBadge = (type: NotificationType) => {
    const config = notificationConfig[type];
    if (!config) return null;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.badgeColor}`}
      >
        {config.label}
      </span>
    );
  };

  const config = notificationConfig[notification.type as NotificationType];
  const IconComponent = config?.icon || AlertTriangle;

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
        notification.status === "unread"
          ? "border-l-4 border-l-blue-500 dark:border-l-blue-400 bg-card shadow-sm"
          : "bg-muted/50"
      }`}
      onClick={() => onClick?.(notification.id)}
    >
      <CardContent>
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${config?.bgColor || "bg-muted"}`}>
            <IconComponent
              className={`h-5 w-5 ${config?.color || "text-muted-foreground"}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-foreground truncate">
                {notification.title}
              </h3>
              <div className="flex items-center space-x-2">
                {notification.status === "unread" && (
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                )}
                {getStatusBadge(notification.type)}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground">{notification.time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
