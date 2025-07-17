"use client";

import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartCredentialAbuseData } from "@/components/overview/constants";
import { useOverviewDateRange } from "@/store/overview-date-range";

export const description = "Credential-Abuse Funnel Transitions (24h)";

// single‐series config for ChartContainer
export const chartConfig = {
  value: { label: "Event Count", color: "#FFA500" },
} satisfies ChartConfig;

export default function ChartCredentialAbuseFunnelBar({
  className,
}: React.ComponentProps<"div">) {
  const { date } = useOverviewDateRange();

  // Create filtered data for the selected time period
  const filteredData = chartCredentialAbuseData.map((item) => ({
    flow: item.flow,
    value: item.value[date]
  }));

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Credential-Abuse Funnel Transitions</CardTitle>
        <CardDescription>
          Counts of transitions between credential-abuse stages
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={filteredData}
            layout="vertical"
            margin={{ top: 16, bottom: 24, left: 0, right: 24 }}
          >
            {/* horizontal grid lines */}
            <CartesianGrid
              horizontal
              vertical={false}
              stroke="#e0e0e0"
              strokeDasharray="4 4"
            />

            {/* X axis (bottom) */}
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              label={{
                value: "Event Count",
                position: "bottom",
                offset: 10,
              }}
            />

            {/* Y axis (left) */}
            <YAxis
              dataKey="flow"
              type="category"
              axisLine={false}
              tickLine={false}
              width={220}
              tick={{ fontSize: 14 }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel className="min-w-[10rem]" />
              }
            />

            {/* the bars */}
            <Bar
              dataKey="value"
              fill={chartConfig.value.color}
              barSize={12}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
