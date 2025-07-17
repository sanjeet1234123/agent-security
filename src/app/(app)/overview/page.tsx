"use client";

import PageHeader from "@/components/page-header";
import OverviewGovernanceCompliance from "@/components/overview/overview-governance-compliance";
import OverviewLiveAgentFeed from "@/components/overview/overview-live-agents-feed";
import OverviewAgentsMemory from "@/components/overview/overview-agents-memory";
import OverviewRecentOpencases from "@/components/overview/overview-recent-opencases";
import OverviewSocSummary from "@/components/overview/overview-soc-summary";
import ChartKillChainRadar from "@/components/overview/charts/charts-kill-chain-radar";
import ChartCredentialAbuseFunnelBar from "@/components/overview/charts/charts-credential-abuse-funnel";
import ChartTimeToContainStacked from "@/components/overview/charts/charts-median-time-to-contain-stacked";
import ChartSignalToNoise from "@/components/overview/charts/charts-cross-cloud-signal-to-noise-ratio";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ExportReportPDF } from "@/components/overview/export-report-pdf/export-report-pdf";
import { useOverviewDateRange } from "@/store/overview-date-range";
import type { DateRange } from "@/store/overview-date-range";
import SendPDFMail from "@/components/overview/send-pdf-mail/send-pdf-mail";

const dateData = [
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
];

export default function OverviewPage() {
  const { date, setDate } = useOverviewDateRange();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="AgentSOC Overview"
          description="An overview of the AgentSOC platform, including key metrics, recent activity, and system health."
        />
        <div className="flex items-center gap-4">
          <SegmentedControl
            data={dateData}
            value={date}
            onValueChange={(val) => setDate(val as DateRange)}
            size="md"
          />
          <SendPDFMail />
          <ExportReportPDF />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <OverviewSocSummary />
        <OverviewAgentsMemory />
        <ChartKillChainRadar />
        <ChartSignalToNoise />
        <OverviewLiveAgentFeed />
        <OverviewRecentOpencases />
        <OverviewGovernanceCompliance />
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <ChartCredentialAbuseFunnelBar />
          <ChartTimeToContainStacked />
        </div>
      </div>
    </div>
  );
}
