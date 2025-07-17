import { AlertTriangle, CheckCircle, Shield } from "lucide-react";
import dayjs from "dayjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Incident } from "@/types/incident-type";
import {
  capitalizeText,
  getDispositionBadgeColor,
} from "@/lib/common-function";

interface IncidentCard1Props {
  incident: Incident;
}

export default function IncidentCard1({ incident }: IncidentCard1Props) {
  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "N/A";
    return dayjs(timestamp).format("YYYY-MM-DD HH:mm [UTC]");
  };

  const getDispositionIcon = (status: string | null) => {
    if (!status) return null;

    switch (status) {
      case "Needs Attention":
        return <AlertTriangle className="h-4 w-4" />;
      case "Cleared":
        return <CheckCircle className="h-4 w-4" />;
      case "Contained":
        return <Shield className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Incident Name: {incident.name || "Unknown"}</span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getDispositionBadgeColor(
              incident.action
            )}`}
          >
            {getDispositionIcon(incident.action)}
            {incident.action || "Unknown"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Request Detail</p>
          <p className="text-base text-muted-foreground">
            {incident.description || "No description available"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Category",
              value: capitalizeText(incident.category),
            },
            {
              name: "Timestamp Detected",
              value: formatTimestamp(incident.created_at),
            },
            {
              name: "AI Response Executed",
              value: formatTimestamp(incident.ai_responsed_at),
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-base text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
