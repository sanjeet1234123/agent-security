"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface IncidentsFiltersProps {
  searchTerm: string;
  dispositionFilter: string;
  categoryFilter: string;
  severityFilter: string;
  onSearchChange: (value: string) => void;
  onDispositionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSeverityChange: (value: string) => void;
}

const DISPOSITION_OPTIONS = [
  { value: "all", label: "All Disposition" },
  { value: "needs attention", label: "Needs Attention" },
  { value: "contained", label: "Contained" },
  { value: "cleared", label: "Cleared" },
];

const CATEGORY_OPTIONS = [
  { value: "all", label: "All Categories" },
  { value: "privilege escalation", label: "Privilege Escalation" },
  { value: "unauthorized access", label: "Unauthorized Access" },
  { value: "malware", label: "Malware" },
  {
    value: "misconfiguration / data exposure",
    label: "Misconfiguration / Data Exposure",
  },
  { value: "vulnerability", label: "Vulnerability" },
  { value: "reconnaissance", label: "Reconnaissance" },
  { value: "ddos", label: "DDoS" },
  { value: "sensitive data exposure", label: "Sensitive Data Exposure" },
  { value: "anomalous api behaviour", label: "Anomalous API Behaviour" },
  { value: "credential exfiltration", label: "Credential Exfiltration" },
  { value: "misconfiguration", label: "Misconfiguration" },
  { value: "risky auth config", label: "Risky Auth Config" },
  { value: "web attack / injection", label: "Web Attack / Injection" },
  { value: "command-and-control", label: "Command-and-Control" },
  { value: "port scan", label: "Port Scan" }, // firewall / network
  { value: "vpn brute force", label: "VPN Brute Force" }, // firewall / remote-access
  { value: "brute force attack", label: "Brute Force Attack" }, // generic / auth
  { value: "impossible travel login", label: "Impossible Travel Login" }, // O365 / IdP
  { value: "phishing email", label: "Phishing Email" }, // O365 / email sec
  { value: "suspicious mailbox rule", label: "Suspicious Mailbox Rule" }, // O365
  { value: "risky oauth consent", label: "Risky OAuth Consent" }, // O365 / Azure AD
  { value: "dns tunneling", label: "DNS Tunneling" }, // network exfiltration
  { value: "lateral movement", label: "Lateral Movement" }, // network / endpoint
  { value: "ransomware activity", label: "Ransomware Activity" }, // endpoint / files
  { value: "crypto mining", label: "Crypto Mining" }, // cloud / compute
  { value: "public bucket exposure", label: "Public Bucket Exposure" }, // cloud storage
  { value: "excessive api errors", label: "Excessive API Errors" }, // application/API misuse
  { value: "zero day exploit", label: "Zero-Day Exploit" }, // apps / endpoints
  { value: "mass mail anomalies", label: "Mass Mail Anomalies" },
];

const SEVERITY_OPTIONS = [
  { value: "all", label: "All Severities" },
  { value: "info", label: "Info" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

export default function IncidentsFilters({
  searchTerm,
  dispositionFilter,
  categoryFilter,
  severityFilter,
  onSearchChange,
  onDispositionChange,
  onCategoryChange,
  onSeverityChange,
}: IncidentsFiltersProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Sync local state with prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localSearchTerm);
  };

  const handleSearchInputChange = (value: string) => {
    setLocalSearchTerm(value);
    // If value is emptied, immediately reset
    if (value === "") {
      onSearchChange("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <form onSubmit={handleSearchSubmit} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search incidents by ID, name, or category..."
          value={localSearchTerm}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          className="pl-10"
        />
      </form>

      <Select value={dispositionFilter} onValueChange={onDispositionChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by disposition" />
        </SelectTrigger>
        <SelectContent>
          {DISPOSITION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={severityFilter} onValueChange={onSeverityChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by severity" />
        </SelectTrigger>
        <SelectContent>
          {SEVERITY_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
