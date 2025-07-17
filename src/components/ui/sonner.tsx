"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast } from "sonner";
import { CircleCheck, TriangleAlert, CircleX } from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          // Success colors
          "--success-bg": "var(--popover)",
          "--success-text": "var(--popover-foreground)",
          "--success-border": "var(--success-br)",
          // Error colors
          "--error-bg": "var(--popover)",
          "--error-text": "var(--popover-foreground)",
          "--error-border": "var(--error-br)",
          // Warning colors
          "--warning-bg": "var(--popover)",
          "--warning-text": "var(--popover-foreground)",
          "--warning-border": "var(--warning-br)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

// Custom toast utility functions
interface ToastOptions {
  title: string;
  description?: string;
}

const showSuccessToast = ({ title, description }: ToastOptions) => {
  toast.success(title, {
    description,
    icon: <CircleCheck size={20} color="var(--success)" />,
    cancel: {
      label: "Close",
      onClick: () => {
        toast.dismiss();
      },
    },
  });
};

const showWarningToast = ({ title, description }: ToastOptions) => {
  toast.warning(title, {
    description,
    icon: <TriangleAlert size={20} color="var(--warning)" />,
    cancel: {
      label: "Close",
      onClick: () => {
        toast.dismiss();
      },
    },
  });
};

const showErrorToast = ({ title, description }: ToastOptions) => {
  toast.error(title, {
    description,
    icon: <CircleX size={20} color="var(--error)" />,
    cancel: {
      label: "Close",
      onClick: () => {
        toast.dismiss();
      },
    },
  });
};

export { Toaster, showSuccessToast, showWarningToast, showErrorToast };
