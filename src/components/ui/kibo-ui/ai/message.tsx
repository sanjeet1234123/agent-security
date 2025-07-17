import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ComponentProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant";
};

export const AIMessage = ({ className, from, ...props }: AIMessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user"
        ? "is-user [&>div]:max-w-[80%]"
        : "is-assistant flex-row-reverse justify-end",
      className
    )}
    {...props}
  />
);

export type AIMessageContentProps = HTMLAttributes<HTMLDivElement>;

export const AIMessageContent = ({
  children,
  className,
  ...props
}: AIMessageContentProps) => (
  <div
    className={cn(
      "flex flex-col gap-2 rounded-lg px-4 py-3 text-sm",
      "bg-muted text-foreground",
      "group-[.is-user]:bg-linear-to-br from-blue-500 to-blue-700 group-[.is-user]:text-white",
      className
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);

export type AIMessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const AIMessageAvatar = ({
  src,
  name,
  className,
  ...props
}: AIMessageAvatarProps) => (
  <Avatar className={cn("size-8", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
);

export const AIMessageTimestampContainer = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col gap-2",
      "group-[.is-user]:items-end group-[.is-assistant]:items-start",
      "group-[.is-user]:text-left group-[.is-assistant]:text-left",
      className
    )}
    {...props}
  />
);

// Enable relative time plugin
dayjs.extend(relativeTime);

export type AIMessageTimestampProps = HTMLAttributes<HTMLSpanElement> & {
  timestamp: number;
  format?: "time" | "relative" | "full" | "date";
  showOnHover?: boolean;
};

export const AIMessageTimestamp = ({
  className,
  timestamp,
  format = "time",
  showOnHover = false,
  ...props
}: AIMessageTimestampProps) => {
  const formatTimestamp = (ts: number): string => {
    const date = dayjs(ts);

    switch (format) {
      case "relative":
        return date.fromNow();

      case "full":
        return date.format("MMM D, YYYY h:mm A");

      case "date":
        return date.format("MMM D, YYYY");

      case "time":
      default:
        return date.format("h:mm A");
    }
  };

  return (
    <span
      className={cn(
        "text-xs text-muted-foreground transition-opacity",
        showOnHover && "opacity-0 group-hover:opacity-100",
        className
      )}
      title={dayjs(timestamp).format("MMM D, YYYY h:mm A")}
      {...props}
    >
      {formatTimestamp(timestamp)}
    </span>
  );
};
