"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import IncidentCard1 from "@/components/incidents/id/incident-card1";
import IncidentCard2 from "@/components/incidents/id/incident-card2";
import IncidentCard3 from "@/components/incidents/id/incident-card3";
import IncidentCard4 from "@/components/incidents/id/incident-card4";
import { useGetIncidentById } from "@/hooks/queries/use-incident-queries";
import { useIncidentStore } from "@/store/incident-store";
import { ExtraIncidentData } from "@/components/incidents/constant";
import { capitalizeText, getSeverityBadgeColor } from "@/lib/common-function";
import { usePatchIncidentStatusMutation } from "@/hooks/mutations/use-incident-mutations";

export default function IncidentDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { selectedIncident, clearSelectedIncident } = useIncidentStore();
  const patchIncidentStatus = usePatchIncidentStatusMutation();

  const incidentId = Number(params.id);

  // Determine if this incident is from dummy data
  // Check if the incident ID matches any from the dummy data after ID transformation
  // or if the incident exists in the store and has characteristics of dummy data
  const isDummyIncident =
    selectedIncident &&
    // Check if the incident ID is in a range that would be assigned to dummy data
    // or if the incident structure matches dummy data patterns
    (ExtraIncidentData.some(
      (dummyIncident) =>
        selectedIncident.name === dummyIncident.name &&
        selectedIncident.description === dummyIncident.description
    ) ||
      // If we have selectedIncident and its ID matches the current ID, prefer store data
      (selectedIncident.id === incidentId &&
        selectedIncident.name &&
        selectedIncident.description));

  const {
    data: incidentData,
    isLoading,
    error,
  } = useGetIncidentById(incidentId);

  // Use store data for dummy incidents, API data for real incidents
  const currentIncident = isDummyIncident ? selectedIncident : incidentData;
  const currentIsLoading = isDummyIncident ? false : isLoading;
  const currentError = isDummyIncident ? null : error;

  const handleBackClick = () => {
    router.push("/incident");
    clearSelectedIncident();
  };

  const RenderContent = () => {
    if (currentIsLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <Loader size="sm" />
            <p className="text-muted-foreground">Loading incident details...</p>
          </div>
        </div>
      );
    }

    if (currentError || !currentIncident) {
      // If we don't have data and it might be a dummy incident accessed directly
      // try to find it in the dummy data
      if (!currentIncident && !currentIsLoading) {
        const directDummyIncident = ExtraIncidentData.find(() => {
          // This would need to be matched based on the ID logic from the main page
          // For now, we'll show an error message suggesting to navigate from the table
          return false;
        });

        if (directDummyIncident) {
          // If we found it, we could set it in the store and use it
          // But for now, we'll suggest navigation from the incidents table
        }
      }

      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              {currentError
                ? "Error loading incident details."
                : "Incident not found."}
            </p>
            {!currentError && !currentIncident && (
              <p className="text-sm text-muted-foreground">
                Please navigate to this incident from the incidents table.
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full gap-8">
        <header className="flex justify-between items-center gap-4">
          <div className="flex flex-col gap-0">
            <div className="flex gap-6 items-start">
              <h1 className="text-2xl font-bold">
                Incident ID: SOC-{currentIncident.id}
              </h1>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {capitalizeText(currentIncident.category)}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getSeverityBadgeColor(
                    currentIncident.severity
                  )}`}
                >
                  {capitalizeText(currentIncident.severity)}
                </span>
              </div>
            </div>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">
              Detailed view of the security incident
            </p>
          </div>

          {currentIncident.status === "open" ? (
            <Button
              variant="gradient"
              className="cursor-pointer"
              onClick={() => {
                patchIncidentStatus.mutate({
                  incident_id: currentIncident.id,
                  status: "closed",
                });
              }}
            >
              Mark as Closed
            </Button>
          ) : (
            <Button variant="secondary" className="cursor-pointer" disabled>
              Incident Closed
            </Button>
          )}
        </header>

        <IncidentCard1 incident={currentIncident} />
        <div className="flex items-center gap-8 w-full">
          <IncidentCard2 incident={currentIncident} />
          <IncidentCard4 category={currentIncident.category} />
        </div>
        {currentIncident?.category?.toLowerCase() ===
        "sensitive data exposure" ? null : (
          <IncidentCard3 incident={currentIncident} />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={handleBackClick}
          className="cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Incidents
        </Button>
      </div>

      <RenderContent />
      {/* Spacer to ensure content doesn't touch the bottom */}
      <div className="h-4"></div>
    </div>
  );
}
