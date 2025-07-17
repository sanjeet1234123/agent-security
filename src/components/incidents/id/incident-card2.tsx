import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";
import "@/styles/github-markdown.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Incident } from "@/types/incident-type";

interface IncidentCard2Props {
  incident: Incident;
}

export default function IncidentCard2({ incident }: IncidentCard2Props) {
  const { resolvedTheme } = useTheme();

  const MarkdownData = incident.insights || "No insights available.";

  return (
    <Card className="h-full flex-1">
      <CardHeader>
        <CardTitle>Triage Agent - System of Intelligence</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="markdown markdown-body"
          data-theme={resolvedTheme || "light"}
        >
          <ReactMarkdown>{MarkdownData}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
