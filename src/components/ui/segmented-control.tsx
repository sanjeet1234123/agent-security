"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const segmentedControlVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-muted p-2",
  {
    variants: {
      size: {
        sm: "h-8 p-0.5",
        md: "h-10 p-1",
        lg: "h-12 p-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const segmentedControlItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-in-out rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs h-6 [&>svg]:size-3 [&>svg]:shrink-0",
        md: "px-3 py-1.5 text-sm h-8 [&>svg]:size-4 [&>svg]:shrink-0",
        lg: "px-4 py-2 text-base h-10 [&>svg]:size-5 [&>svg]:shrink-0",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        iconOnly: true,
        class: "px-1.5 py-1 text-xs h-6 w-6 [&>svg]:size-3 [&>svg]:shrink-0",
      },
      {
        size: "md",
        iconOnly: true,
        class: "px-2 py-1.5 text-sm h-8 w-8 [&>svg]:size-4 [&>svg]:shrink-0",
      },
      {
        size: "lg",
        iconOnly: true,
        class:
          "px-2.5 py-2 text-base h-10 w-10 [&>svg]:size-5 [&>svg]:shrink-0",
      },
    ],
    defaultVariants: {
      size: "md",
      iconOnly: false,
    },
  }
);

interface SegmentedControlProps
  extends VariantProps<typeof segmentedControlVariants> {
  data:
    | string[]
    | Array<{ value: string; label: React.ReactNode; disabled?: boolean }>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  loop?: boolean;
  rovingFocus?: boolean;
  iconOnly?: boolean;
}

const SegmentedControl = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  SegmentedControlProps
>(
  (
    {
      data,
      value,
      defaultValue,
      onValueChange,
      size,
      className,
      orientation,
      disabled,
      loop,
      rovingFocus,
      iconOnly = false,
      ...props
    },
    ref
  ) => {
    // Normalize data to consistent format
    const normalizedData = React.useMemo(() => {
      return data.map((item) => {
        if (typeof item === "string") {
          return { value: item, label: item, disabled: false };
        }
        return { disabled: false, ...item };
      });
    }, [data]);

    // Handle value change with deselection prevention
    const handleValueChange = React.useCallback(
      (newValue: string) => {
        // Prevent deselection - only allow changes to different values
        if (newValue && newValue !== value) {
          onValueChange?.(newValue);
        }
      },
      [value, onValueChange]
    );

    return (
      <ToggleGroupPrimitive.Root
        ref={ref}
        type="single"
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        orientation={orientation}
        disabled={disabled}
        loop={loop}
        rovingFocus={rovingFocus}
        className={cn(segmentedControlVariants({ size }), className)}
        {...props}
      >
        {normalizedData.map((item) => (
          <ToggleGroupPrimitive.Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              segmentedControlItemVariants({ size, iconOnly }),
              "data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
              "data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground"
            )}
          >
            {item.label}
          </ToggleGroupPrimitive.Item>
        ))}
      </ToggleGroupPrimitive.Root>
    );
  }
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl, type SegmentedControlProps };
