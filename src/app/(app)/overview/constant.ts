export interface MetricProps {
  name: string;
  value: Record<"7d" | "30d" | "90d", string | number>;
  description: string;
}


