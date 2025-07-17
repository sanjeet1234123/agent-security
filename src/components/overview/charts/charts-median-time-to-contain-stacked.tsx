"use client";

import { cn } from "@/lib/utils";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { chartMedianTimeData } from "@/components/overview/constants";

export const description = "A stacked bar chart of median minutes to contain";

export const chartConfig = {
  aws_ttc_min: { label: "AWS", color: "var(--chart-1)" },
  azure_ttc_min: { label: "Azure", color: "var(--chart-2)" },
  fw_ttc_min: { label: "Firewall", color: "var(--chart-3)" },
  cf_ttc_min: { label: "Cloudflare", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function ChartTimeToContainStacked({
  className,
}: React.ComponentProps<"div">) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle>Median Time-to-Contain by Surface</CardTitle>
        <CardDescription>
          Daily median minutes to contain per surface
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart data={chartMedianTimeData} margin={{ top: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(d) => d.slice(5)} // "MM-DD"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent hideLabel className="min-w-[10rem]" />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />

            {/* bottom segment (AWS) rounded on its bottom edge */}
            <Bar
              dataKey="aws_ttc_min"
              stackId="a"
              fill={chartConfig.aws_ttc_min.color}
              radius={[0, 0, 4, 4]}
            />
            {/* middle segments */}
            <Bar
              dataKey="azure_ttc_min"
              stackId="a"
              fill={chartConfig.azure_ttc_min.color}
            />
            <Bar
              dataKey="fw_ttc_min"
              stackId="a"
              fill={chartConfig.fw_ttc_min.color}
            />
            {/* top segment (CF) rounded on its top edge */}
            <Bar
              dataKey="cf_ttc_min"
              stackId="a"
              fill={chartConfig.cf_ttc_min.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
