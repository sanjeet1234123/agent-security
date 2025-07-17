import { AlertTriangle, CheckCircle, LucideIcon, Shield } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  getDispositionBadgeColor,
  getSeverityBadgeColor,
} from "@/lib/common-function";
import { OpenIncidentData } from "./constants";

export default function OverviewRecentOpencases() {
  const statusToIconMap: Record<string, LucideIcon> = {
    "Needs Attention": AlertTriangle,
    Cleared: CheckCircle,
    Contained: Shield,
  };

  const renderStatusIcon = (status: string | null) => {
    if (!status || !statusToIconMap[status]) return null;

    const IconComponent = statusToIconMap[status];
    return <IconComponent size={16} />;
  };

  return (
    <Card className="col-span-12 lg:col-span-7">
      <CardTitle>
        <div className="flex flex-col">
          <h3 className="text-lg">Recent Incidents</h3>
          <p className="text-sm text-muted-foreground font-normal">
            Recent incidents that require attention or action across platforms
          </p>
        </div>
      </CardTitle>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Incident ID</TableHead>
              <TableHead>Agent Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Disposition</TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OpenIncidentData.map((agent, index) => (
              <TableRow key={index}>
                <TableCell>SOC-{agent.id}</TableCell>
                <TableCell className="font-medium">{agent.name}</TableCell>
                <TableCell>{agent.category}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getDispositionBadgeColor(
                      agent.disposition
                    )}`}
                  >
                    {renderStatusIcon(agent.disposition)}
                    {agent.disposition || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeColor(
                      agent.severity
                    )}`}
                  >
                    {agent.severity
                      ? agent.severity.charAt(0).toUpperCase() +
                        agent.severity.slice(1)
                      : "-"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
