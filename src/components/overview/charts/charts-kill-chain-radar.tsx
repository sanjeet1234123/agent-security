"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartKillChainData } from "@/components/overview/constants";
import { useOverviewDateRange } from "@/store/overview-date-range";
import type { KillChainPhase } from "@/components/overview/type";

export const description = "A radar chart with multiple data";

export const chartConfig = {
  aws: { label: "AWS", color: "var(--chart-1)" },
  azure: { label: "Azure", color: "var(--chart-2)" },
  fw: { label: "Firewall", color: "var(--chart-3)" },
  cf: { label: "Cloudflare", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function ChartKillChainRadar() {
  const { date } = useOverviewDateRange();

  // Create data for the selected time period
  const filteredData = chartKillChainData.map((phase: KillChainPhase) => ({
    phase: phase.phase,
    aws: phase.aws[date],
    azure: phase.azure[date],
    fw: phase.fw[date],
    cf: phase.cf[date]
  }));

  return (
    <Card className="col-span-12 lg:col-span-4">
      <CardHeader>
        <CardTitle>Kill-Chain Exposure Radar</CardTitle>
        <CardDescription>
          Showing exposure levels across kill-chain phases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <RadarChart
            data={filteredData}
            margin={{ top: -40, bottom: 0 }}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="min-w-[10rem]"
                />
              }
            />
            <PolarAngleAxis dataKey="phase" />
            <PolarGrid />
            {Object.entries(chartConfig).map(([key, { label, color }]) => (
              <Radar
                key={key}
                name={label}
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={0.6}
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
