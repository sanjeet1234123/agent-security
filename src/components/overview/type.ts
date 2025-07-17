import { LucideIcon } from "lucide-react";

// overview-agents-memory
export interface IncidentDistributionCardProps {
  platform: string;
  incidents: Record<"7d" | "30d" | "90d", number>;
  accounts: Record<"7d" | "30d" | "90d", number>;
  percentage: Record<"7d" | "30d" | "90d", string>;
}

// overview-governance-compliance
export interface MetricProps {
  name: string;
  value: Record<"7d" | "30d" | "90d", string | number>;
  description: string;
}

// overview-live-agents-feed
export interface LiveAgentFeedDataProps {
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  timestamp: string;
}

// overview-recent-opencases
export interface OpenIncidentProp {
  id: number;
  name: string;
  category: string;
  severity: "low" | "medium" | "high" | "critical";
  disposition: "Needs Attention" | "Contained" | "Cleared";
}

// overview-soc-summary
export interface SOCCardProps {
  values: Record<"7d" | "30d" | "90d", number>;
  description: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

// charts-kill-chain-radar
export interface KillChainPhase {
  phase: string;
  aws: Record<"7d" | "30d" | "90d", number>;
  azure: Record<"7d" | "30d" | "90d", number>;
  fw: Record<"7d" | "30d" | "90d", number>;
  cf: Record<"7d" | "30d" | "90d", number>;
}

export type KillChainData = KillChainPhase[];

// charts-credential-abuse-funnel
export interface CredentialAbuseLink {
  source: string;
  target: string;
  value: Record<"7d" | "30d" | "90d", number>;
}

export type CredentialAbuseData = {
  flow: string;
  value: Record<"7d" | "30d" | "90d", number>;
};
