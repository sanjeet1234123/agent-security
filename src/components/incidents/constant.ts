import { Incident, MITRECategory } from "@/types/incident-type";

export const ExtraIncidentData: Array<Incident> = [
  {
    id: 2001,
    created_at: "2025-07-06T05:45:00Z",
    ai_responsed_at: "2025-07-06T05:48:00Z",
    name: "AdminPolicy Attach",
    description:
      "Swapnil Bhowmik attached the managed policy **AdministratorAccess** to a non-privileged IAM role outside the approved change window.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "privilege escalation",
    insights:
      "- Triggered by CloudTrail `AttachRolePolicy` event\n- No associated Jira change ticket\n- Role previously limited to read-only duties\n- Swapnil’s tenure: **6 months** (< 1 year)\n- Historical approval ratio **62 %** (< 70 % threshold)",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2002,
    created_at: "2025-07-06T07:12:20Z",
    ai_responsed_at: "2025-07-06T07:15:31Z",
    name: "Root Login — Tor IP",
    description:
      "Archit Dadhich performed an AWS root-account console login from a Tor exit node.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "unauthorized access",
    insights:
      "- AWS `ConsoleLogin` event with `root`: true\n- Source IP: **185.220.102.243** (Tor)\n- MFA used, but company policy forbids root console access\n- GuardDuty flagged as `Recon:EC2/TorIPCaller`",
    severity: "critical",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2003,
    created_at: "2025-07-05T03:30:44Z",
    ai_responsed_at: "2025-07-05T03:35:07Z",
    name: "EC2 CryptoMiner",
    description:
      "Shail launched an m6i.xlarge spot instance that began mining Monero within 4 minutes of boot.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "malware",
    insights:
      "- VPC flow logs show outbound traffic to **pool.minexmr.com:3333**\n- CPU sustained at 99 %\n- Instance tagged `dev-test`, no workload scheduled\n- GuardDuty finding: `CryptoCurrency:EC2/BitcoinTool.B`",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2004,
    created_at: "2025-07-05T11:05:10Z",
    ai_responsed_at: "2025-07-05T11:08:52Z",
    name: "Public S3 PII Bucket",
    description:
      "Bucket `prod-customer-exports` containing 42 k CSV rows of PII was set to `PublicRead` by Balram Choudhary.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "misconfiguration and data exposure",
    insights:
      "- Object ACL and bucket policy both allowed `*`\n- SensitiveScanner classed 87 % of objects as GDPR-protected\n- Detected via daily Macie job\n- No CloudFront OAI in front of bucket",
    severity: "critical",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2005,
    created_at: "2025-07-04T04:22:18Z",
    ai_responsed_at: "2025-07-04T04:26:02Z",
    name: "Lambda Critical CVE",
    description:
      "Function `img-resizer` running Node 18 includes `libvips` 8.14.0 vulnerable to CVE-2025-15234 (RCE).",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "vulnerability",
    insights:
      "- Listed as **critical** (CVSS 9.8)\n- Lambda has IAM permission `s3:*` on all buckets\n- Exploit proof-of-concept published 24 h earlier\n- Ashish Sharma pushed commit without dependency scan",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2006,
    created_at: "2025-07-04T09:57:00Z",
    ai_responsed_at: "2025-07-04T10:01:14Z",
    name: "SSH Port Probes",
    description:
      "Swapnil Bhowmik’s bastion host received 3 221 TCP-22 probes from 198 unique IPs over 6 h.",
    status: "closed",
    user: "agent_soc",
    action: "Cleared",
    category: "reconnaissance",
    insights:
      "- All IPs in Spamhaus DROP list\n- Fail2Ban blocked after 3 attempts\n- No successful logins observed",
    severity: "medium",
    is_approved: null,
    reviewed: true,
  },
  {
    id: 2007,
    created_at: "2025-07-03T02:40:11Z",
    ai_responsed_at: "2025-07-03T02:43:55Z",
    name: "UDP Amp DDoS",
    description:
      "Dalchand Bharadwaj’s public-facing API (UDP/20888) abused for amplification against external target.",
    status: "closed",
    user: "agent_soc",
    action: "Contained",
    category: "ddos",
    insights:
      "- 12 Gbps peak egress\n- Shield Advanced mitigated within 90 s\n- Source reflection vector: CLDAP\n- Rate-limit and firewall rule applied",
    severity: "medium",
    is_approved: null,
    reviewed: true,
  },
  {
    id: 2008,
    created_at: "2025-07-03T05:18:33Z",
    ai_responsed_at: "2025-07-03T05:22:49Z",
    name: "Sensitive CSV in S3",
    description:
      "Macie found unencrypted file `salary_2024.csv` with 3 k rows of payroll data uploaded by Nitin Agarwal.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "sensitive data exposure",
    insights:
      "- Object not encrypted with SSE-KMS\n- Access limited to HR role, but no bucket policy enforcement\n- File contains PAN and Aadhaar numbers",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2009,
    created_at: "2025-07-06T08:05:02Z",
    ai_responsed_at: "2025-07-06T08:07:16Z",
    name: "ListObjects Error Spike",
    description:
      "Swapnil Bhowmik’s service saw 400 % rise in `AccessDenied` errors on `ListObjectsV2` in `prod-data-lake`.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "anomalous api behaviour",
    insights:
      "- Spike began after failed policy attach (see Incident 2001)\n- May indicate automated enumeration script\n- No data exfiltration detected",
    severity: "medium",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2010,
    created_at: "2025-07-06T09:14:50Z",
    ai_responsed_at: "2025-07-06T09:18:03Z",
    name: "Instance Creds Exfil",
    description:
      "Archit Dadhich retrieved EC2 instance-profile credentials and exfiltrated them to paste.lolbin.xyz.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "credential exfiltration",
    insights:
      "- CloudTrail `GetSessionToken` followed by outbound HTTPS to paste site\n- Instance profile had `s3:PutObject` on backups bucket\n- Temporary creds disabled; role rotated",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2011,
    created_at: "2025-07-05T06:45:17Z",
    ai_responsed_at: "2025-07-05T06:48:29Z",
    name: "SG 22 Open World",
    description:
      "Shail modified security group `sg-027fa` to allow `0.0.0.0/0` on TCP 22 for debugging.",
    status: "closed",
    user: "agent_soc",
    action: "Cleared",
    category: "misconfiguration",
    insights:
      "- Change reverted automatically by SCP guardrail\n- No inbound connections during exposure window (18 min)",
    severity: "medium",
    is_approved: null,
    reviewed: true,
  },
  {
    id: 2012,
    created_at: "2025-07-05T08:33:22Z",
    ai_responsed_at: "2025-07-05T08:36:40Z",
    name: "PassRole Chain to Admin",
    description:
      "Balram Choudhary chained `PassRole` permissions to gain `AdministratorAccess` via two hops.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "privilege escalation",
    insights:
      "- Detected by IAM Access Analyzer\n- Exploited overlooked role `ci-deploy` that could pass to `admin-bridge`\n- Balram’s approval ratio 55 %",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2013,
    created_at: "2025-07-04T12:12:10Z",
    ai_responsed_at: "2025-07-04T12:15:24Z",
    name: "RDS Trojan",
    description:
      "Trojanized plugin `pg_stat_statements.so` found in production PostgreSQL by Ashish Sharma.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "malware",
    insights:
      "- Plugin ran shell commands on CREATE EXTENSION\n- Originated from compromised S3 repo mirror\n- No data integrity issues detected yet",
    severity: "high",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 2014,
    created_at: "2025-07-04T14:05:05Z",
    ai_responsed_at: "2025-07-04T14:08:57Z",
    name: "SaaS AssumeRole No MFA",
    description:
      "Swapnil Bhowmik configured SaaS CI/CD integration role without MFA enforcement.",
    status: "open",
    user: "agent_soc",
    action: "Needs Attention",
    category: "risky auth config",
    insights:
      "- Role `thirdparty-ci` assumable by external ID only\n- SCP requires MFA for privileged roles; violation logged\n- No assume-role events yet",
    severity: "medium",
    is_approved: null,
    reviewed: false,
  },
  {
    id: 1015,
    created_at: "2025-07-03T10:10:11Z",
    ai_responsed_at: "2025-07-03T10:12:38Z",
    name: "WAF-Blocked SQLi",
    description:
      "WAF blocked UNION-based SQL injection attempt against `/api/orders` from 92.63.194.11.",
    status: "closed",
    user: "agent_soc",
    action: "Contained",
    category: "web attack and injection",
    insights:
      "- Rule `AWS#SQLiHeader` matched\n- No backend error codes observed (all 403)\n- Dalchand Bharadwaj’s service auto-scaled normally",
    severity: "medium",
    is_approved: null,
    reviewed: true,
  },
  {
    id: 1016,
    created_at: "2025-07-03T13:55:00Z",
    ai_responsed_at: "2025-07-03T13:58:14Z",
    name: "C2 DNS Query",
    description:
      "Nitin Agarwal’s workstation queried `d2fe45h4h.mockdns.live` tied to RedLine Stealer C2.",
    status: "closed",
    user: "agent_soc",
    action: "Contained",
    category: "command-and-control",
    insights:
      "- Detected by DNS Firewall threat list `proofpoint-c2`\n- EDR isolated host\n- No lateral movement observed",
    severity: "medium",
    is_approved: null,
    reviewed: true,
  },
];

export const MITRE_MAP: Record<MITRECategory, string[]> = {
  // ───── EXISTING CATEGORIES ───────────────────────────────────────
  "privilege escalation": [
    "T1068 – Exploitation for Privilege Escalation",
    "T1134 – Access Token Manipulation",
    "T1055 – Process Injection",
    "T1078 – Valid Accounts",
  ],

  "unauthorized access": [
    "T1190 – Exploit Public-Facing Application",
    "T1078 – Valid Accounts",
    "T1484 – Domain Policy Modification",
    "T1059 – Command Shell",
  ],

  malware: [
    "T1105 – Ingress Tool Transfer",
    "T1027 – Obfuscated Files/Information",
    "T1204 – User Execution",
    "T1059 – Command & Scripting Interpreter",
  ],

  "misconfiguration and data exposure": [
    "T1530 – Data from Cloud Storage",
    "T1526 – Cloud Account Attack",
    "T1087 – Account Discovery",
    "T1562 – Impair Defenses",
  ],

  vulnerability: [
    "T1190 – Exploit Public-Facing Application",
    "T1203 – Client Exploitation",
    "T1068 – Exploitation for Priv-Esc",
  ],

  reconnaissance: [
    "T1595 – Active Scanning",
    "T1592 – Gather Victim Host Info",
    "T1069 – Permission Group Discovery",
  ],

  ddos: ["T1498 – Network DoS", "T1499 – Endpoint DoS"],

  "sensitive data exposure": [
    "T1005 – Data from Local System",
    "T1537 – Transfer Data to Cloud",
    "T1041 – Exfil over C2 Channel",
  ],

  "anomalous api behaviour": [
    "T1105 – Ingress Tool Transfer",
    "T1071 – App-Layer Protocol Abuse",
    "T1098 – Account Manipulation",
  ],

  "credential exfiltration": [
    "T1040 – Network Sniffing",
    "T1557 – Adversary-in-the-Middle",
    "T1110 – Brute Force",
    "T1558 – Steal/Forge Certs",
  ],

  misconfiguration: [
    "T1562 – Impair Defenses",
    "T1530 – Data from Cloud Storage",
    "T1087 – Account Discovery",
  ],

  "risky auth config": [
    "T1556 – Modify Auth Process",
    "T1098 – Account Manipulation",
    "T1606 – Cloud Infrastructure Discovery",
  ],

  "web attack and injection": [
    "T1190 – Exploit Public-Facing Application",
    "T1059 – Command & Scripting Interpreter",
    "T1499 – Endpoint DoS",
  ],

  "command-and-control": [
    "T1071 – Application Layer Protocol",
    "T1090 – Proxy",
    "T1008 – Fallback Channels",
  ],

  // ───── NEW INCIDENT TYPES ────────────────────────────────────────
  "port scan": [
    "T1595 – Active Scanning",
    "T1046 – Network Service Discovery",
    "T1018 – Remote System Discovery",
  ],

  "vpn brute force": ["T1110.003 – Password Spraying", "T1110 – Brute Force"],

  "brute force attack": [
    "T1110 – Brute Force",
    "T1190 – Exploit Public-Facing Application",
  ],

  "impossible travel login": [
    "T1078 – Valid Accounts",
    "T1098 – Account Manipulation",
  ],

  "phishing email": ["T1566 – Phishing", "T1204 – User Execution"],

  "suspicious mailbox rule": [
    "T1114.003 – Email Client Rule",
    "T1098 – Account Manipulation",
  ],

  "risky oauth consent": [
    "T1098.004 – Add OAuth Application",
    "T1525 – Modify Existing Cloud Compute",
  ],

  "dns tunneling": [
    "T1048.003 – Exfil over Unencrypted/Obfuscated Non-HTTP Protocol",
    "T1071.004 – DNS C2",
  ],

  "lateral movement": [
    "T1021 – Remote Services",
    "T1570 – Lateral Tool Transfer",
    "T1105 – Ingress Tool Transfer",
  ],

  "ransomware activity": [
    "T1486 – Data Encrypted for Impact",
    "T1490 – Inhibit System Recovery",
  ],

  "crypto mining": [
    "T1496 – Resource Hijacking",
    "T1105 – Ingress Tool Transfer",
  ],

  "public bucket exposure": [
    "T1530 – Data from Cloud Storage",
    "T1526 – Cloud Account Attack",
  ],

  "excessive api errors": [
    "T1595 – Active Scanning",
    "T1069 – Permission Group Discovery",
  ],

  "zero day exploit": [
    "T1190 – Exploit Public-Facing Application",
    "T1068 – Priv-Esc Exploit",
    "T1203 – Client Exploitation",
  ],

  "mass mail anomalies": [
    "T1566 – Phishing",
    "T1114 – Email Collection",
    "T1071 – Application Layer Protocol",
  ],
};
