"use client";

import React, { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Label } from "recharts";
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
import { chartCrossCloudSignalData } from "@/components/overview/constants";
import { useOverviewDateRange } from "@/store/overview-date-range";

export const description = "Cross-Cloud Signal-to-Noise Ratio";

export const chartConfig: ChartConfig = {
  AWS: { label: "AWS", color: "var(--chart-1)" },
  AZURE: { label: "Azure", color: "var(--chart-2)" },
  FW: { label: "Firewall", color: "var(--chart-3)" },
  CF: { label: "Cloudflare", color: "var(--chart-4)" },
};

export default function ChartSignalToNoise() {
  const { date } = useOverviewDateRange();
  const [data, setData] = useState(chartCrossCloudSignalData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setData(chartCrossCloudSignalData);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [date]);

  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader>
        <CardTitle>Cross-Cloud Signal-to-Noise Ratio</CardTitle>
        <CardDescription>Incident / alert ratio over time</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[350px]">
            <div className="animate-spin w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full" />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <LineChart
              data={data}
              margin={{ left: 30, right: 0, top: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                padding={{ left: 20, right: 20 }}
                tickFormatter={(d) => d.slice(5)}
              >
                <Label
                  value="Date"
                  position="insideBottom"
                  offset={-28}
                  style={{ fill: "#666", fontSize: 14 }}
                />
              </XAxis>
              <YAxis tickLine={false} axisLine={false} tickMargin={8}>
                <Label
                  value="Signal-to-Noise Ratio"
                  angle={-90}
                  offset={-18}
                  position="insideLeft"
                  style={{ textAnchor: "middle", fill: "#666", fontSize: 14 }}
                />
              </YAxis>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="min-w-[10rem]" />}
              />
              <ChartLegend content={<ChartLegendContent />} className="mt-10" />
              {Object.entries(chartConfig).map(([key, { color }]) => (
                <Line
                  key={key}
                  dataKey={key}
                  type="monotone"
                  stroke={color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
