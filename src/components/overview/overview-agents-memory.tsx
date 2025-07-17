"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "../ui/card";
import AWSLogoDark from "@/assets/Amazon Web Services_dark.svg";
import AWSLogoLight from "@/assets/Amazon Web Services_light.svg";
import AzureLogo from "@/assets/Azure Logo.svg";
import CloudflareLogo from "@/assets/Cloudflare Logo.svg";
import CiscoLogoDark from "@/assets/Cisco_dark.svg";
import CiscoLogoLight from "@/assets/Cisco_light.svg";
import type { IncidentDistributionCardProps } from "./type";
import { IncidentDistributionCardData } from "./constants";
import { useOverviewDateRange } from "@/store/overview-date-range";

export default function OverviewAgentsMemory() {
  return (
    <Card className="col-span-12 md:col-span-5">
      <CardTitle>
        <div className="flex flex-col">
          <h3 className="text-lg">Agents Memory</h3>
          <p className="text-sm text-muted-foreground font-normal">
            Connected Knowledge bases with Agents Memory and Context
          </p>
        </div>
      </CardTitle>
      <CardContent>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {IncidentDistributionCardData.map((item, index) => (
            <IncidentDistributionCard key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const IncidentDistributionCard = ({
  platform,
  incidents,
  accounts,
  percentage,
}: IncidentDistributionCardProps) => {
  const { resolvedTheme } = useTheme();
  const { date } = useOverviewDateRange();

  const getPlatformLogo = (platform: string) => {
    switch (platform) {
      case "AWS":
        return resolvedTheme === "dark" ? AWSLogoDark : AWSLogoLight;
      case "Azure":
        return AzureLogo;
      case "Meraki":
        return resolvedTheme === "dark" ? CiscoLogoDark : CiscoLogoLight;
      case "Cloudflare":
        return CloudflareLogo;
      default:
        return null;
    }
  };

  const logoSrc = getPlatformLogo(platform);
  const currentIncidents = incidents[date];
  const currentAccounts = accounts[date];
  const currentPercentage = percentage[date];

  return (
    <div className="p-4 bg-gray-100 dark:bg-blue-300/15 rounded-lg shadow hover:shadow-lg transition-shadow flex justify-between items-center">
      <div className="flex items-center gap-4">
        {logoSrc && (
          <div className="bg-white dark:bg-neutral-900 p-2 rounded-md">
            <Image
              src={logoSrc}
              alt={`${platform} logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold">{platform}</h4>
          <p className="text-sm text-accent-foreground">{currentAccounts} Accounts</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-semibold">{currentIncidents}</h4>
        <p className="text-sm text-accent-foreground">{currentPercentage}</p>
      </div>
    </div>
  );
};
