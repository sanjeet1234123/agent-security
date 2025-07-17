"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import chroma from "chroma-js";

import { cn } from "@/lib/utils";

interface AvatarContextValue {
  variant: "default" | "light" | "filled";
  color: string;
}

const AvatarContext = React.createContext<AvatarContextValue>({
  variant: "default",
  color: "#3B82F6",
});

interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {
  variant?: "default" | "light" | "filled";
  color?: string;
}

function Avatar({
  className,
  variant = "default",
  color = "#3B82F6", // Default blue
  children,
  ...props
}: AvatarProps) {
  const contextValue = React.useMemo(
    () => ({ variant, color }),
    [variant, color]
  );

  return (
    <AvatarContext.Provider value={contextValue}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "relative flex size-8 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    </AvatarContext.Provider>
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const { variant, color } = React.useContext(AvatarContext);

  const getColorStyles = () => {
    if (variant === "default") return {};

    try {
      const baseColor = chroma(color);

      if (variant === "light") {
        const lightBackground = baseColor.alpha(0.1).css();
        const textColor = baseColor.darken(0.5).css();

        return {
          backgroundColor: lightBackground,
          color: textColor,
        };
      }

      if (variant === "filled") {
        const backgroundColor = baseColor.css();
        // Use chroma's contrast calculation to determine text color
        const textColor =
          chroma.contrast(baseColor, "white") > 3.5 ? "white" : "black";

        return {
          backgroundColor,
          color: textColor,
        };
      }

      return {};
    } catch {
      console.warn("Invalid color provided to Avatar:", color);
      return {
        backgroundColor:
          variant === "light" ? "rgba(59, 130, 246, 0.1)" : "#3B82F6",
        color: variant === "light" ? "#1E40AF" : "white",
      };
    }
  };

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        variant === "default" ? "bg-muted" : "",
        className
      )}
      style={variant !== "default" ? getColorStyles() : undefined}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
