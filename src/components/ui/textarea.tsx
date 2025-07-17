import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
  {
    variants: {
      variant: {
        default:
          "border-input placeholder:text-muted-foreground focus-visible:border-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 rounded-md border bg-transparent px-3 py-2 shadow-xs",
        filled:
          "bg-muted border-0 placeholder:text-muted-foreground focus-visible:bg-background rounded-md px-3 py-2 shadow-xs",
        unstyled: "bg-transparent border-0 p-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
}

function Textarea({
  className,
  variant,
  autosize = false,
  minRows = 1,
  maxRows = 10,
  disabled = false,
  ...props
}: TextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || !autosize) return;

    // Store scroll position to restore later
    const scrollTop = textarea.scrollTop;

    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = "auto";

    // Get the natural content height
    const scrollHeight = textarea.scrollHeight;

    // Get computed styles for calculations
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight =
      parseFloat(computedStyle.lineHeight) ||
      parseFloat(computedStyle.fontSize) * 1.2;
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
    const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
    const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;

    // Calculate min and max heights
    const minHeight =
      lineHeight * minRows +
      paddingTop +
      paddingBottom +
      borderTop +
      borderBottom;
    const maxHeight =
      lineHeight * maxRows +
      paddingTop +
      paddingBottom +
      borderTop +
      borderBottom;

    // Set the height within bounds
    let newHeight = Math.max(scrollHeight, minHeight);

    // If content exceeds maxHeight, allow scrolling
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }

    textarea.style.height = `${newHeight}px`;

    // Restore scroll position
    textarea.scrollTop = scrollTop;
  }, [autosize, minRows, maxRows]);

  // Adjust height when value changes
  React.useEffect(() => {
    if (autosize) {
      adjustHeight();
    }
  }, [adjustHeight, props.value, autosize]);

  // Adjust height on mount
  React.useEffect(() => {
    if (autosize) {
      // Use setTimeout to ensure the textarea is fully rendered
      setTimeout(() => {
        adjustHeight();
      }, 0);
    }
  }, [adjustHeight, autosize]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (autosize) {
      adjustHeight();
    }
    if (props.onInput) {
      props.onInput(e);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      onInput={handleInput}
      disabled={disabled}
      style={{
        ...(autosize
          ? {
              overflow: "hidden",
              resize: "none",
            }
          : {
              minHeight: minRows ? `${minRows * 1.5}rem` : undefined,
              maxHeight: maxRows ? `${maxRows * 1.5}rem` : undefined,
            }),
        ...props.style,
      }}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
