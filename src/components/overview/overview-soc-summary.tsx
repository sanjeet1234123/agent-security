import chroma from "chroma-js";
import { Card, CardContent, CardTitle } from "../ui/card";
import type { SOCCardProps } from "./type";
import { SOCCardData } from "./constants";
import { useOverviewDateRange } from "@/store/overview-date-range";

export default function OverviewSocSummary() {
  return (
    <Card className="col-span-12 md:col-span-7">
      <CardTitle>
        <div className="flex flex-col">
          <h3 className="text-lg">SOC Metrics</h3>
          <p className="text-sm text-muted-foreground font-normal">
            Security alerts and detections
          </p>
        </div>
      </CardTitle>
      <CardContent>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 h-full">
          {SOCCardData.map((item, index) => (
            <SOCCard key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const SOCCard = ({
  values,
  description,
  change,
  icon: Icon,
  color,
}: SOCCardProps) => {
  const { date } = useOverviewDateRange();
  const currentValue = values[date];
  const backgroundColor = chroma(color).alpha(0.1).css();

  return (
    <div
      className="p-4 rounded-lg border flex flex-col gap-3 h-[183px] shadow hover:shadow-lg transition-all duration-200 cursor-default"
      style={{ backgroundColor }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md" style={{ backgroundColor: color }}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{currentValue.toLocaleString()}</h2>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full gap-2">
        <p className="text-base font-semibold text-gray-700 dark:text-gray-50">
          {description}
        </p>
        <p className="text-xs text-accent-foreground">{change}</p>
      </div>
    </div>
  );
};
