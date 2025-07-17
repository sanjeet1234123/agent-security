"use client";

import { useTheme } from "next-themes";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Progress } from "@/components/ui/progress";
import chroma from "chroma-js";
import type { MetricProps } from "./type";
import { MetricsData } from "./constants";
import { useOverviewDateRange } from "@/store/overview-date-range";

// Function to determine color based on percentage value using chroma.js
function getMetricColor(
  value: string | number,
  theme: string | undefined,
  metricName?: string
): { textColor: string; progressColor: string; backgroundColor: string } {
  // Check if value is a percentage
  if (typeof value === "string" && value.includes("%")) {
    const percentageValue = parseFloat(value.replace("%", ""));

    // Reverse color order for Analyst-Override Ratio
    let baseColor: chroma.Color;
    if (metricName === "Analyst-Override Ratio") {
      if (percentageValue >= 0 && percentageValue <= 20) {
        baseColor = chroma("#22c55e"); // green-500
      } else if (percentageValue > 20 && percentageValue <= 40) {
        baseColor = chroma("#3b82f6"); // blue-500
      } else if (percentageValue > 40 && percentageValue <= 60) {
        baseColor = chroma("#eab308"); // yellow-500
      } else if (percentageValue > 60 && percentageValue <= 80) {
        baseColor = chroma("#f97316"); // orange-500
      } else {
        baseColor = chroma("#ef4444"); // red-500
      }
    } else {
      if (percentageValue >= 0 && percentageValue <= 20) {
        baseColor = chroma("#ef4444"); // red-500
      } else if (percentageValue > 20 && percentageValue <= 40) {
        baseColor = chroma("#f97316"); // orange-500
      } else if (percentageValue > 40 && percentageValue <= 60) {
        baseColor = chroma("#eab308"); // yellow-500
      } else if (percentageValue > 60 && percentageValue <= 80) {
        baseColor = chroma("#3b82f6"); // blue-500
      } else {
        baseColor = chroma("#22c55e"); // green-500
      }
    }

    // Adjust colors for dark mode
    const isDark = theme === "dark";
    const textColor = isDark
      ? baseColor.brighten(0.5).hex()
      : baseColor.darken(0.3).hex();

    // Progress color: white in dark mode, exact text color in light mode
    const progressColor = isDark ? "#ffffff" : textColor;

    const backgroundColor = isDark
      ? baseColor.alpha(0.1).css()
      : baseColor.alpha(0.05).css();

    return {
      textColor,
      progressColor,
      backgroundColor,
    };
  }

  // Default color for non-percentage values
  const isDark = theme === "dark";
  const defaultTextColor = isDark ? "#ffffff" : "#000000";
  const defaultProgressColor = isDark ? "#ffffff" : "#000000";
  const defaultBackgroundColor = isDark
    ? "rgba(100, 116, 139, 0.1)"
    : "rgba(148, 163, 184, 0.05)";

  return {
    textColor: defaultTextColor,
    progressColor: defaultProgressColor,
    backgroundColor: defaultBackgroundColor,
  };
}

// Function to check if value is a percentage and extract the numeric value
function getPercentageValue(value: string | number): number | null {
  if (typeof value === "string" && value.includes("%")) {
    return parseFloat(value.replace("%", ""));
  }
  return null;
}

export default function OverviewGovernanceCompliance() {
  return (
    <Card className="col-span-12 lg:col-span-6">
      <CardTitle>
        <div className="flex flex-col">
          <h3 className="text-lg">Governance and Compliance</h3>
          <p className="text-sm text-muted-foreground font-normal">
            Overview of governance and compliance status across platforms
          </p>
        </div>
      </CardTitle>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MetricsData.map((item, index) => (
            <GovernanceComplianceMetricsCard key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GovernanceComplianceMetricsCard({
  name,
  value,
  description,
}: MetricProps) {
  const { date } = useOverviewDateRange();
  const { resolvedTheme } = useTheme();
  const currentValue = value[date];
  const { textColor, progressColor, backgroundColor } = getMetricColor(
    currentValue,
    resolvedTheme,
    name
  );
  const percentageValue = getPercentageValue(currentValue);

  return (
    <div
      className="p-4 rounded-lg shadow hover:shadow-lg transition-all duration-200 flex flex-col gap-3 justify-between border"
      style={{
        backgroundColor: backgroundColor,
        borderColor: chroma(progressColor).alpha(0.2).css(),
      }}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold" style={{ color: textColor }}>
          {currentValue}
        </h3>

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-accent-foreground">{description}</p>
        </div>
      </div>

      {percentageValue !== null && (
        <div
          className="w-full"
          style={
            {
              "--progress-background": chroma(progressColor).alpha(0.2).css(),
              "--progress-foreground": progressColor,
            } as React.CSSProperties
          }
        >
          <Progress
            value={percentageValue}
            className="h-2 [&>*]:bg-[var(--progress-foreground)] bg-[var(--progress-background)]"
          />
        </div>
      )}
    </div>
  );
}
