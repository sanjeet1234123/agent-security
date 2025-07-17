import { Card, CardContent, CardTitle } from "../ui/card";
import type { LiveAgentFeedDataProps } from "./type";
import { LiveAgentFeedData } from "./constants";

export default function OverviewLiveAgentFeed() {
  return (
    <Card className="col-span-12 lg:col-span-5">
      <CardTitle>
        <div className="flex flex-col">
          <h3 className="text-lg">Live Agents Feed</h3>
          <p className="text-sm text-muted-foreground font-normal">
            Live status of active agents in the SOC environment
          </p>
        </div>
      </CardTitle>
      <CardContent>
        {LiveAgentFeedData.map((item, index) => (
          <LiveAgentFeedCard key={index} {...item} />
        ))}
      </CardContent>
    </Card>
  );
}

const LiveAgentFeedCard = ({
  name,
  description,
  icon: Icon,
  timestamp,
}: LiveAgentFeedDataProps) => {
  return (
    <div className="flex items-start gap-4 p-4 border-b last:border-b-0">
      <Icon className="h-6 w-6 text-primary" />
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold">{name}</h4>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
