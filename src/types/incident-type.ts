export interface IncidentPaginationParams {
  page?: number;
  page_size?: number;
}

export interface PaginatedIncidents {
  page: number;
  page_size: number;
  incidents: Array<Incident>;
}

export type IncidentAction = "Needs Attention" | "Contained" | "Cleared";
export type IncidentSeverity = "low" | "medium" | "high" | "critical" | "info";
export type IncidentStatus = "open" | "closed";

export interface Incident {
  id: number;
  created_at: string | null;
  ai_responsed_at: string | null;
  name: string | null;
  description: string | null;
  status: IncidentStatus | null;
  user: string | null;
  action: IncidentAction | null;
  category: string | null;
  severity: IncidentSeverity | null;
  insights: string | null;
  is_approved: boolean | null;
  reviewed: boolean | null;
}

export interface AdminDecisionParams {
  user_input?: string;
  conversation_id: string;
}

export interface ApprovalIncidentParams {
  incident_id: number;
  is_approved: boolean;
}

export interface ApprovalIncidentResponse {
  success: boolean;
  incident_id: number;
  is_approved: boolean;
}

export type MITRECategory =
  | "privilege escalation"
  | "unauthorized access"
  | "malware"
  | "misconfiguration and data exposure"
  | "vulnerability"
  | "reconnaissance"
  | "ddos"
  | "sensitive data exposure"
  | "anomalous api behaviour"
  | "credential exfiltration"
  | "misconfiguration"
  | "risky auth config"
  | "web attack and injection"
  | "command-and-control"
  | "port scan"
  | "vpn brute force"
  | "brute force attack"
  | "impossible travel login"
  | "phishing email"
  | "suspicious mailbox rule"
  | "risky oauth consent"
  | "dns tunneling"
  | "lateral movement"
  | "ransomware activity"
  | "crypto mining"
  | "public bucket exposure"
  | "excessive api errors"
  | "zero day exploit"
  | "mass mail anomalies";

export interface IncidentStatusRequest {
  incident_id: number;
  status: IncidentStatus;
}

export interface SendPDFMailParams {
  email: string;
  pdf: Blob;
}
