import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MetricType {
  metric: string;
  value: string;
  sinceQ1: string;
}

const metricsData: Array<MetricType> = [
  {
    metric: "Incidents Processed",
    value: "1,120",
    sinceQ1: "+8%",
  },
  {
    metric: "Escalated Requests",
    value: "300",
    sinceQ1: "+5%",
  },
  {
    metric: "Auto-Resolved Incidents",
    value: "800",
    sinceQ1: "+12%",
  },
  {
    metric: "New Alerts",
    value: "80",
    sinceQ1: "+0.5%",
  },
  {
    metric: "Agent Efficiency",
    value: "72%",
    sinceQ1: "—",
  },
  {
    metric: "Containment Coverage",
    value: "89%",
    sinceQ1: "—",
  },
  {
    metric: "MTTC",
    value: "0.93 min",
    sinceQ1: "—",
  },
  {
    metric: "True Positive Rate",
    value: "96%",
    sinceQ1: "—",
  },
  {
    metric: "Agent Mesh Uptime",
    value: "99.97%",
    sinceQ1: "—",
  },
];

interface ComplianceDetail {
  title: string;
  value: string;
  description: string;
}

const complianceDetails: Array<ComplianceDetail> = [
  {
    title: "Compliance Coverage",
    value: "92%",
    description:
      "Controls spanning SOC 2, PCI DSS, and GDPR are actively and continuously monitored by dedicated Compliance Agents.",
  },
  {
    title: "Policy Violations",
    value: "2",
    description:
      "Both violations involved automated remediation playbooks conflicting with newly updated Cedar governance rules. Corrective policy tuning is complete and no repeat events have occurred.",
  },
  {
    title: "Analyst Override Ratio",
    value: "9%",
    description:
      "Overrides were predominantly triggered for geopolitical-sensitive endpoints, prompting an upcoming ML-based context-aware escalation model.",
  },
];

interface Incident {
  id: string;
  name: string;
  category: string;
  disposition: string;
  severity: string;
}

const incidentsData: Array<Incident> = [
  {
    id: "SOC-2001",
    name: "AdminPolicy Attach",
    category: "Privilege Escalation",
    disposition: "Needs Attention",
    severity: "Critical",
  },
  {
    id: "SOC-2002",
    name: "Root Login — Tor IP",
    category: "Unauthorized Access",
    disposition: "Contained",
    severity: "Critical",
  },
  {
    id: "SOC-2003",
    name: "EC2 CryptoMiner",
    category: "Malware",
    disposition: "Contained",
    severity: "Critical",
  },
  {
    id: "SOC-2004",
    name: "Public S3 PII Bucket",
    category: "Data Exposure",
    disposition: "Cleared",
    severity: "High",
  },
  {
    id: "SOC-2005",
    name: "Lambda Critical CVE",
    category: "Vulnerability",
    disposition: "Needs Attention",
    severity: "Critical",
  },
  {
    id: "SOC-2010",
    name: "Instance Creds Exfil",
    category: "Credential Exfil",
    disposition: "Needs Attention",
    severity: "Critical",
  },
];

export default function ReportContent() {
  return (
    <div className="rounded-lg overflow-hidden">
      <div className="page1 flex flex-col gap-6 p-8">
        {/* PDF Header */}

        <header className=" pb-4 border-b flex flex-col gap-4">
          <h1 className="text-foreground text-3xl font-bold">
            AgentSOC Cybersecurity Report
          </h1>
          <div className="flex flex-col gap-2">
            <p className="text-lg text-muted-foreground">
              Q2 2025 Performance & Compliance Overview
            </p>

            <div className="flex gap-8 text-sm text-muted-foreground">
              <span>
                <strong>Prepared for:</strong> Leadership & Stakeholders
              </span>
              <span>
                <strong>Prepared by:</strong> AgentSOC Autonomous Security
                Operations Center
              </span>
              <span>
                <strong>Generated:</strong> {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </header>

        {/* PDF Content */}
        <div className="flex flex-col gap-6 [&>div>.title]:text-2xl [&>div>.title]:font-semibold [&>div>.title]:text-sky-600 dark:[&>div>.title]:text-sky-300">
          {/* Executive Summary Section */}
          <div className="flex flex-col gap-2">
            <p className="title">Executive Summary</p>
            <p className="text-base text-muted-foreground">
              In Q2 2025 the AgentSOC platform processed 1,120 security
              incidents—an 8% increase quarter-on-quarter—while maintaining a
              Mean Time-to-Contain (MTTC) of 0.93 minutes. Automation played a
              pivotal role: 72% of incidents were fully resolved without human
              intervention and 89% of known threat types were successfully
              contained. Overall compliance monitoring now covers 92% of
              framework controls (SOC 2, PCI DSS, GDPR). Two policy violations
              were identified and remediated, and the agent mesh sustained
              99.97% uptime.
            </p>
          </div>

          {/* Key Performance Indicators Section */}
          <div className="flex flex-col gap-2">
            <p className="title">Key Performance Indicators</p>
            <div className="rounded-lg border overflow-hidden">
              <Table className="bg-sky-50/50 dark:bg-sky-900/50">
                <TableHeader>
                  <TableRow className="bg-sky-100 hover:bg-sky-200/60 dark:bg-sky-900 dark:hover:bg-sky-800">
                    <TableHead>Metric</TableHead>
                    {metricsData.map((item, index) => (
                      <TableHead
                        key={index}
                        className="whitespace-normal break-words"
                      >
                        {item.metric}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-sky-100 dark:hover:bg-sky-800">
                    <TableCell className="font-medium">Value</TableCell>
                    {metricsData.map((item, index) => (
                      <TableCell key={index}>{item.value}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="hover:bg-sky-100 dark:hover:bg-sky-800">
                    <TableCell className="font-medium">Since Q1</TableCell>
                    {metricsData.map((item, index) => (
                      <TableCell key={index}>{item.sinceQ1}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Governance & Compliance Section */}
          <div className="flex flex-col gap-2">
            <p className="title">Governance &amp; Compliance Status</p>
            {complianceDetails.map((item, index) => (
              <div key={index}>
                <h3 className="text-base font-medium">
                  {item.title} — {item.value}
                </h3>
                <p className="text-base text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Representative Critical & High Incidents Section */}
          <div className="flex flex-col gap-2">
            <p className="title">
              Representative Critical &amp; High Incidents
            </p>
            <div className="rounded-lg border overflow-hidden">
              <Table className="bg-sky-50/50 dark:bg-sky-900/50">
                <TableHeader>
                  <TableRow className="bg-sky-100 hover:bg-sky-200/60 dark:bg-sky-900 dark:hover:bg-sky-800">
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Disposition</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidentsData.map((incident, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-sky-100 dark:hover:bg-sky-800"
                    >
                      <TableCell>{incident.id}</TableCell>
                      <TableCell>{incident.name}</TableCell>
                      <TableCell>{incident.category}</TableCell>
                      <TableCell>{incident.disposition}</TableCell>
                      <TableCell>{incident.severity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* PDF Footer */}
        <footer className="pt-4 border-t text-center text-sm text-muted-foreground">
          <p>
            This report contains sensitive security information and should be
            handled according to your organization&apos;s data classification
            policies.
          </p>
        </footer>
      </div>
    </div>
  );
}
