import {
  AlertTriangle,
  BadgeCheck,
  BarChart,
  Bot,
  Search,
  Shield,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import type {
  IncidentDistributionCardProps,
  LiveAgentFeedDataProps,
  MetricProps,
  OpenIncidentProp,
  SOCCardProps,
  KillChainData,
  CredentialAbuseLink,
  CredentialAbuseData,
} from "./type";

export const IncidentDistributionCardData: Array<IncidentDistributionCardProps> =
  [
    {
      platform: "AWS",
      incidents: {
        "7d": 280,
        "30d": 600,
        "90d": 1275
      },
      accounts: {
        "7d": 10,
        "30d": 35,
        "90d": 100
      },
      percentage: {
        "7d": "25%",
        "30d": "20%",
        "90d": "15%"
      }
    },
    {
      platform: "Azure",
      incidents: {
        "7d": 280,
        "30d": 660,
        "90d": 2975
      },
      accounts: {
        "7d": 16,
        "30d": 50,
        "90d": 130
      },
      percentage: {
        "7d": "25%",
        "30d": "22%",
        "90d": "35%"
      }
    },
    {
      platform: "Meraki",
      incidents: {
        "7d": 280,
        "30d": 840,
        "90d": 2125
      },
      accounts: {
        "7d": 6,
        "30d": 20,
        "90d": 60
      },
      percentage: {
        "7d": "25%",
        "30d": "28%",
        "90d": "25%"
      }
    },
    {
      platform: "Cloudflare",
      incidents: {
        "7d": 280,
        "30d": 900,
        "90d": 2125
      },
      accounts: {
        "7d": 8,
        "30d": 25,
        "90d": 70
      },
      percentage: {
        "7d": "25%",
        "30d": "30%",
        "90d": "25%"
      }
    }
  ];

export const MetricsData: Array<MetricProps> = [
  {
    name: "Agent Efficiency",
    value: {
      "7d": "72%",
      "30d": "75%",
      "90d": "70%",
    },
    description:
      "Percentage of total incidents fully resolved by agents without human involvement.",
  },
  {
    name: "Containment Coverage",
    value: {
      "7d": "89%",
      "30d": "87%",
      "90d": "85%",
    },
    description:
      "Share of distinct threat types for which the system executed successful containment actions.",
  },
  {
    name: "Analyst-Override Ratio",
    value: {
      "7d": "9%",
      "30d": "11%",
      "90d": "13%",
    },
    description:
      "Proportion of agent decisions that were manually reversed by SOC analysts led to Adaptive Intelligence.",
  },
  {
    name: "Mean Time-to-Contain (MTTC)",
    value: {
      "7d": "0.93 min",
      "30d": "1.2 min",
      "90d": "1.5 min",
    },
    description:
      "Average minutes from first alert intake to enforcement of a blocking or remediation action.",
  },
  {
    name: "Policy Violations",
    value: {
      "7d": 2,
      "30d": 5,
      "90d": 8,
    },
    description:
      "Count of instances where agent actions breached defined Cedar/Rego governance rules.",
  },
  {
    name: "True-Positive Rate",
    value: {
      "7d": "96%",
      "30d": "94%",
      "90d": "91%",
    },
    description:
      "Accuracy metric showing how often agent decisions aligned with analyst-validated ground truth.",
  },
  {
    name: "Compliance Coverage Score",
    value: {
      "7d": "92%",
      "30d": "91%",
      "90d": "89%",
    },
    description:
      "Percentage of required security-framework controls (e.g., SOC 2, PCI) actively monitored by AgentSOC.",
  },
  {
    name: "Agent Mesh Uptime",
    value: {
      "7d": "99.97%",
      "30d": "99.95%",
      "90d": "99.91%",
    },
    description:
      "Aggregate availability of all agents and MCP gateways over a defined period.",
  },
];

export const LiveAgentFeedData: Array<LiveAgentFeedDataProps> = [
  {
    name: "Inspector Agent",
    description:
      "Detected anomalous login patterns and flagged incident SOC-2847 for immediate review.",
    icon: ShieldCheck,
    timestamp: "3 seconds ago",
  },
  {
    name: "Containment Agent",
    description:
      "Successfully isolated compromised endpoint for incident SOC-2845, blocking lateral movement.",
    icon: ShieldX,
    timestamp: "12 seconds ago",
  },
  {
    name: "Inspector Agent",
    description:
      "Analyzing suspicious file hash signatures in incident SOC-2846 - 847 IOCs identified.",
    icon: ShieldCheck,
    timestamp: "28 seconds ago",
  },
  {
    name: "Triage Agent",
    description:
      "Escalated incident SOC-2844 to P1 severity - unusual cryptocurrency transactions detected.",
    icon: AlertTriangle,
    timestamp: "1 minute ago",
  },
  {
    name: "Investigation Agent",
    description:
      "Cross-referenced threat intelligence for SOC-2843, identified APT-29 TTPs correlation.",
    icon: Search,
    timestamp: "2 minutes ago",
  },
  {
    name: "Compliance Agent",
    description:
      "Completed regulatory audit for SOC-2842 - 3 GDPR violations documented and remediated.",
    icon: BadgeCheck,
    timestamp: "4 minutes ago",
  },
];

export const OpenIncidentData: Array<OpenIncidentProp> = [
  {
    id: 2001,
    name: "AdminPolicy Attach",
    category: "Privilege Escalation",
    severity: "critical",
    disposition: "Needs Attention",
  },
  {
    id: 2002,
    name: "Root Login — Tor IP",
    category: "Unauthorized Access",
    severity: "critical",
    disposition: "Contained",
  },
  {
    id: 2003,
    name: "EC2 CryptoMiner",
    category: "Malware",
    severity: "critical",
    disposition: "Contained",
  },
  {
    id: 2004,
    name: "Public S3 PII Bucket",
    category: "Misconfiguration / Data Exposure",
    severity: "high",
    disposition: "Cleared",
  },
  {
    id: 2005,
    name: "Lambda Critical CVE",
    category: "Vulnerability",
    severity: "critical",
    disposition: "Needs Attention",
  },
  {
    id: 2008,
    name: "Sensitive CSV in S3",
    category: "Sensitive Data Exposure",
    severity: "high",
    disposition: "Contained",
  },
  {
    id: 2009,
    name: "ListObjects Error Spike",
    category: "Anomalous API Behaviour",
    severity: "low",
    disposition: "Cleared",
  },
  {
    id: 2010,
    name: "Instance Creds Exfil",
    category: "Credential Exfiltration",
    severity: "critical",
    disposition: "Needs Attention",
  },
  {
    id: 2011,
    name: "Unauthorized IAM Role Creation",
    category: "Privilege Escalation",
    severity: "critical",
    disposition: "Contained",
  },
  {
    id: 2012,
    name: "Unusual Data Transfer Volume",
    category: "Data Exfiltration",
    severity: "high",
    disposition: "Needs Attention",
  },
  {
    id: 2013,
    name: "Unusual API Call Patterns",
    category: "Anomalous API Behaviour",
    severity: "medium",
    disposition: "Cleared",
  },
  {
    id: 2014,
    name: "Unauthorized Security Group Changes",
    category: "Misconfiguration",
    severity: "high",
    disposition: "Contained",
  },
];

export const SOCCardData: Array<SOCCardProps> = [
  {
    values: {
      "7d": 1120,
      "30d": 3000,
      "90d": 8500
    },
    description: "Total Incidents Processed",
    change: "+8% from yesterday",
    icon: BarChart,
    color: "#00a6f4",
  },
  {
    values: {
      "7d": 300,
      "30d": 1200,
      "90d": 3500
    },
    description: "Total Escalated Requests",
    change: "+5% from yesterday",
    icon: AlertTriangle,
    color: "#FF6B6B",
  },
  {
    values: {
      "7d": 800,
      "30d": 2500,
      "90d": 7000
    },
    description: "Auto-Resolved Incidents by AI",
    change: "+1.2% from yesterday",
    icon: Bot,
    color: "#51CF66",
  },
  {
    values: {
      "7d": 80,
      "30d": 250,
      "90d": 700
    },
    description: "New Security Alerts Detected",
    change: "+0.5% from yesterday",
    icon: Shield,
    color: "#8B5CF6",
  },
];

// ------ Charts ---------------------

// charts-median-time-to-contain-stacked
export const chartMedianTimeData = [
  {
    date: "2025-07-07",
    aws_ttc_min: 17,
    azure_ttc_min: 22,
    fw_ttc_min: 11,
    cf_ttc_min: 8,
  },
  {
    date: "2025-07-08",
    aws_ttc_min: 14,
    azure_ttc_min: 19,
    fw_ttc_min: 9,
    cf_ttc_min: 7,
  },
  {
    date: "2025-07-09",
    aws_ttc_min: 13,
    azure_ttc_min: 18,
    fw_ttc_min: 10,
    cf_ttc_min: 6,
  },
  {
    date: "2025-07-10",
    aws_ttc_min: 12,
    azure_ttc_min: 17,
    fw_ttc_min: 9,
    cf_ttc_min: 6,
  },
  {
    date: "2025-07-11",
    aws_ttc_min: 11,
    azure_ttc_min: 16,
    fw_ttc_min: 8,
    cf_ttc_min: 5,
  },
  {
    date: "2025-07-12",
    aws_ttc_min: 11,
    azure_ttc_min: 15,
    fw_ttc_min: 8,
    cf_ttc_min: 5,
  },
  {
    date: "2025-07-13",
    aws_ttc_min: 11,
    azure_ttc_min: 15,
    fw_ttc_min: 8,
    cf_ttc_min: 4,
  },
  {
    date: "2025-07-14",
    aws_ttc_min: 10,
    azure_ttc_min: 14,
    fw_ttc_min: 7,
    cf_ttc_min: 4,
  },
  {
    date: "2025-07-15",
    aws_ttc_min: 10,
    azure_ttc_min: 14,
    fw_ttc_min: 7,
    cf_ttc_min: 4,
  },
  {
    date: "2025-07-16",
    aws_ttc_min: 10,
    azure_ttc_min: 14,
    fw_ttc_min: 7,
    cf_ttc_min: 4,
  },
  {
    date: "2025-07-17",
    aws_ttc_min: 9,
    azure_ttc_min: 13,
    fw_ttc_min: 7,
    cf_ttc_min: 4,
  },
  {
    date: "2025-07-18",
    aws_ttc_min: 9,
    azure_ttc_min: 13,
    fw_ttc_min: 7,
    cf_ttc_min: 4,
  },
  {
    date: "2025-07-19",
    aws_ttc_min: 10,
    azure_ttc_min: 14,
    fw_ttc_min: 8,
    cf_ttc_min: 5,
  },
  {
    date: "2025-07-20",
    aws_ttc_min: 9,
    azure_ttc_min: 13,
    fw_ttc_min: 7,
    cf_ttc_min: 4,
  },
];

// charts-kill-chain-radar
export const chartKillChainData: KillChainData = [
  {
    phase: "Init Access",
    aws: {
      "7d": 6,
      "30d": 8,
      "90d": 10
    },
    azure: {
      "7d": 7,
      "30d": 9,
      "90d": 11
    },
    fw: {
      "7d": 5,
      "30d": 7,
      "90d": 9
    },
    cf: {
      "7d": 6,
      "30d": 8,
      "90d": 10
    }
  },
  {
    phase: "C2",
    aws: {
      "7d": 6,
      "30d": 7,
      "90d": 9
    },
    azure: {
      "7d": 6,
      "30d": 8,
      "90d": 10
    },
    fw: {
      "7d": 9,
      "30d": 11,
      "90d": 13
    },
    cf: {
      "7d": 8,
      "30d": 10,
      "90d": 12
    }
  },
  {
    phase: "Recon",
    aws: {
      "7d": 7,
      "30d": 9,
      "90d": 11
    },
    azure: {
      "7d": 6,
      "30d": 8,
      "90d": 10
    },
    fw: {
      "7d": 8,
      "30d": 10,
      "90d": 12
    },
    cf: {
      "7d": 4,
      "30d": 6,
      "90d": 8
    }
  },
  {
    phase: "Priv Esc",
    aws: {
      "7d": 8,
      "30d": 10,
      "90d": 12
    },
    azure: {
      "7d": 7,
      "30d": 9,
      "90d": 11
    },
    fw: {
      "7d": 3,
      "30d": 5,
      "90d": 7
    },
    cf: {
      "7d": 2,
      "30d": 4,
      "90d": 6
    }
  },
  {
    phase: "Exfil",
    aws: {
      "7d": 6,
      "30d": 8,
      "90d": 10
    },
    azure: {
      "7d": 7,
      "30d": 9,
      "90d": 11
    },
    fw: {
      "7d": 3,
      "30d": 5,
      "90d": 7
    },
    cf: {
      "7d": 1,
      "30d": 3,
      "90d": 5
    }
  }
];

// charts-Cross-cloud-signal-to-noise-ratio
export const rawCrossCloudSignalData = [
  {
    date: "2025-07-07",
    aws_alerts: 1420,
    aws_incidents: 26,
    azure_alerts: 910,
    azure_incidents: 14,
    fw_alerts: 1870,
    fw_incidents: 9,
    cf_alerts: 2160,
    cf_incidents: 11,
  },
  {
    date: "2025-07-08",
    aws_alerts: 1365,
    aws_incidents: 23,
    azure_alerts: 880,
    azure_incidents: 12,
    fw_alerts: 1930,
    fw_incidents: 10,
    cf_alerts: 2240,
    cf_incidents: 13,
  },
  {
    date: "2025-07-09",
    aws_alerts: 1510,
    aws_incidents: 28,
    azure_alerts: 945,
    azure_incidents: 15,
    fw_alerts: 1820,
    fw_incidents: 8,
    cf_alerts: 2310,
    cf_incidents: 10,
  },
  {
    date: "2025-07-10",
    aws_alerts: 1480,
    aws_incidents: 24,
    azure_alerts: 920,
    azure_incidents: 13,
    fw_alerts: 1900,
    fw_incidents: 11,
    cf_alerts: 2250,
    cf_incidents: 12,
  },
  {
    date: "2025-07-11",
    aws_alerts: 1440,
    aws_incidents: 22,
    azure_alerts: 960,
    azure_incidents: 12,
    fw_alerts: 1850,
    fw_incidents: 10,
    cf_alerts: 2190,
    cf_incidents: 9,
  },
  {
    date: "2025-07-12",
    aws_alerts: 1400,
    aws_incidents: 21,
    azure_alerts: 950,
    azure_incidents: 13,
    fw_alerts: 1800,
    fw_incidents: 9,
    cf_alerts: 2200,
    cf_incidents: 10,
  },
  {
    date: "2025-07-13",
    aws_alerts: 1380,
    aws_incidents: 20,
    azure_alerts: 940,
    azure_incidents: 12,
    fw_alerts: 1780,
    fw_incidents: 8,
    cf_alerts: 2180,
    cf_incidents: 9,
  },
  {
    date: "2025-07-14",
    aws_alerts: 1370,
    aws_incidents: 19,
    azure_alerts: 930,
    azure_incidents: 12,
    fw_alerts: 1760,
    fw_incidents: 8,
    cf_alerts: 2150,
    cf_incidents: 9,
  },
  {
    date: "2025-07-15",
    aws_alerts: 1390,
    aws_incidents: 20,
    azure_alerts: 935,
    azure_incidents: 12,
    fw_alerts: 1790,
    fw_incidents: 9,
    cf_alerts: 2170,
    cf_incidents: 10,
  },
  {
    date: "2025-07-16",
    aws_alerts: 1410,
    aws_incidents: 21,
    azure_alerts: 950,
    azure_incidents: 13,
    fw_alerts: 1810,
    fw_incidents: 9,
    cf_alerts: 2190,
    cf_incidents: 10,
  },
  {
    date: "2025-07-17",
    aws_alerts: 1400,
    aws_incidents: 20,
    azure_alerts: 945,
    azure_incidents: 12,
    fw_alerts: 1800,
    fw_incidents: 9,
    cf_alerts: 2180,
    cf_incidents: 10,
  },
  {
    date: "2025-07-18",
    aws_alerts: 1385,
    aws_incidents: 19,
    azure_alerts: 940,
    azure_incidents: 12,
    fw_alerts: 1785,
    fw_incidents: 8,
    cf_alerts: 2165,
    cf_incidents: 9,
  },
  {
    date: "2025-07-19",
    aws_alerts: 1375,
    aws_incidents: 19,
    azure_alerts: 935,
    azure_incidents: 11,
    fw_alerts: 1770,
    fw_incidents: 8,
    cf_alerts: 2150,
    cf_incidents: 9,
  },
  {
    date: "2025-07-20",
    aws_alerts: 1380,
    aws_incidents: 20,
    azure_alerts: 940,
    azure_incidents: 12,
    fw_alerts: 1780,
    fw_incidents: 8,
    cf_alerts: 2160,
    cf_incidents: 9,
  },
];

export const chartCrossCloudSignalData = rawCrossCloudSignalData.map((d) => ({
  date: d.date,
  AWS: +(d.aws_incidents / d.aws_alerts).toFixed(4),
  AZURE: +(d.azure_incidents / d.azure_alerts).toFixed(4),
  FW: +(d.fw_incidents / d.fw_alerts).toFixed(4),
  CF: +(d.cf_incidents / d.cf_alerts).toFixed(4),
}));

// charts-credential-abuse-funnel

// raw sankey‐style data
export const rawCredentialAbuseLinks: CredentialAbuseLink[] = [
  {
    source: "Cloudflare – failed",
    target: "Firewall – failed",
    value: {
      "7d": 8200,
      "30d": 24600,
      "90d": 73800
    }
  },
  {
    source: "Cloudflare – suspicious",
    target: "Firewall – suspicious",
    value: {
      "7d": 950,
      "30d": 2850,
      "90d": 8550
    }
  },
  {
    source: "Firewall – failed",
    target: "AWS IAM – denied",
    value: {
      "7d": 3100,
      "30d": 9300,
      "90d": 27900
    }
  },
  {
    source: "Firewall – failed",
    target: "Azure Entra – denied",
    value: {
      "7d": 2800,
      "30d": 8400,
      "90d": 25200
    }
  },
  {
    source: "Firewall – suspicious",
    target: "AWS IAM – denied",
    value: {
      "7d": 420,
      "30d": 1260,
      "90d": 3780
    }
  },
  {
    source: "Firewall – suspicious",
    target: "Azure Entra – denied",
    value: {
      "7d": 380,
      "30d": 1140,
      "90d": 3420
    }
  },
  {
    source: "AWS IAM – denied",
    target: "Containment action",
    value: {
      "7d": 1150,
      "30d": 3450,
      "90d": 10350
    }
  },
  {
    source: "Azure Entra – denied",
    target: "Containment action",
    value: {
      "7d": 940,
      "30d": 2820,
      "90d": 8460
    }
  }
];
// helper to abbreviate long node names
function abbreviate(node: string): string {
  return node
    .replace("Cloudflare", "CF")
    .replace("Firewall", "FW")
    .replace("AWS IAM", "AWS")
    .replace("Azure Entra", "Azure")
    .replace("Containment action", "Contained")
    .replace("suspicious", "susp");
}
// flatten for bar chart
export const chartCredentialAbuseData: CredentialAbuseData[] = rawCredentialAbuseLinks.map(
  ({ source, target, value }) => ({
    flow: `${abbreviate(source)} → ${abbreviate(target)}`,
    value
  })
);
