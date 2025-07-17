"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { SegmentedControl } from "@/components/ui/segmented-control";

interface ThemeToggleProps {
  size?: "sm" | "md" | "lg";
  showIcons?: boolean;
  iconOnly?: boolean;
  className?: string;
}

const ThemeToggle = React.forwardRef<
  React.ElementRef<typeof SegmentedControl>,
  ThemeToggleProps
>(
  (
    { size = "md", showIcons = false, iconOnly = false, className, ...props },
    ref
  ) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

    const themeData = [
      {
        value: "light",
        label: iconOnly ? (
          <Sun />
        ) : showIcons ? (
          <div className="flex items-center gap-2">
            <Sun />
            <span>Light</span>
          </div>
        ) : (
          "Light"
        ),
      },
      {
        value: "dark",
        label: iconOnly ? (
          <Moon />
        ) : showIcons ? (
          <div className="flex items-center gap-2">
            <Moon />
            <span>Dark</span>
          </div>
        ) : (
          "Dark"
        ),
      },
      {
        value: "system",
        label: iconOnly ? (
          <Monitor />
        ) : showIcons ? (
          <div className="flex items-center gap-2">
            <Monitor />
            <span>System</span>
          </div>
        ) : (
          "System"
        ),
      },
    ];

    return (
      <SegmentedControl
        ref={ref}
        data={themeData}
        value={theme}
        onValueChange={setTheme}
        size={size}
        iconOnly={iconOnly}
        className={className}
        {...props}
      />
    );
  }
);
ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle, type ThemeToggleProps };
