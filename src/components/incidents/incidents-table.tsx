"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { unstable_ViewTransition as ViewTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, AlertTriangle, CheckCircle, Shield } from "lucide-react";
import { Incident } from "@/types/incident-type";
import dayjs from "dayjs";
import { useIncidentStore } from "@/store/incident-store";
import {
  getSeverityBadgeColor,
  getDispositionBadgeColor,
  capitalizeText,
  getStatusBadgeColor,
} from "@/lib/common-function";

interface IncidentsTableProps {
  incidents: Array<Incident>;
}

export default function IncidentsTable({ incidents }: IncidentsTableProps) {
  const router = useRouter();

  const { setSelectedIncident } = useIncidentStore();

  const handleRowClick = (incident: Incident) => {
    startTransition(() => {
      router.push(`/incident/${incident.id}`);
      setSelectedIncident(incident);
    });
  };

  const getStatusIcon = (status: string | null) => {
    if (!status) return null;

    switch (status) {
      case "Needs Attention":
        return <AlertTriangle className="h-3 w-3" />;
      case "Cleared":
        return <CheckCircle className="h-3 w-3" />;
      case "Contained":
        return <Shield className="h-3 w-3" />;
      case "open":
        return <AlertCircle className="h-3 w-3" />;
      case "closed":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "-";
    return dayjs(timestamp).format("DD/MM/YYYY HH:mm");
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Incident ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Incident Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Disposition</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Review State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-muted-foreground"
              >
                No incidents found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((incident) => (
              <TableRow
                key={incident.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(incident)}
              >
                <TableCell className="font-medium">
                  <ViewTransition name={`incident-${incident.id}`}>
                    SOC-{incident.id}
                  </ViewTransition>
                </TableCell>
                <TableCell>{formatTimestamp(incident.created_at)}</TableCell>
                <TableCell className="max-w-md">
                  {incident.name || "-"}
                </TableCell>
                <TableCell>{capitalizeText(incident.category)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBadgeColor(
                      incident.severity
                    )}`}
                  >
                    {incident.severity
                      ? incident.severity.charAt(0).toUpperCase() +
                        incident.severity.slice(1)
                      : "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getDispositionBadgeColor(
                      incident.action
                    )}`}
                  >
                    {getStatusIcon(incident.action)}
                    {incident.action || "-"}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      incident.status
                    )}`}
                  >
                    {getStatusIcon(incident.status)}
                    {incident.status || "-"}
                  </span>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  {incident.reviewed ? (
                    <>
                      <CheckCircle className="text-green-600" size={16} />
                      <p>Reviewed</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="text-yellow-500" size={16} />
                      <p>Needs Review</p>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
