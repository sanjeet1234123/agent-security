"use client";

import { useState } from "react";
import PageHeader from "@/components/page-header";
import IncidentsFilters from "@/components/incidents/incidents-filters";
import IncidentsTable from "@/components/incidents/incidents-table";
import IncidentsPagination from "@/components/incidents/incidents-pagination";
import { useGetIncidents } from "@/hooks/queries/use-incident-queries";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExtraIncidentData } from "@/components/incidents/constant";

const ITEMS_PER_PAGE = 10;

export default function IncidentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dispositionFilter, setDispositionFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: incidentsData,
    isFetching,
    error,
    refetch,
    isRefetching,
  } = useGetIncidents({
    page: 1, // Always fetch first page since we'll handle pagination manually
    page_size: 1000, // Fetch a large number to get all data at once
  });

  // Get incidents and pagination info from API response
  const incidents = incidentsData?.incidents || [];

  // Calculate starting ID for dummy data (one less than the last incident ID)
  const lastIncidentId = incidents[incidents.length - 1]?.id;
  const startingDummyId = lastIncidentId ? lastIncidentId - 1 : 0;

  // Create dummy data with properly ordered IDs
  const dummyDataWithOrderedIds = ExtraIncidentData.map((incident, index) => ({
    ...incident,
    id: startingDummyId - index,
  }));

  // Combine API data with dummy data
  const allIncidents = [...incidents, ...dummyDataWithOrderedIds];

  // const totalItems = allIncidents.length; // This would ideally come from API

  // Apply client-side filtering (if needed, or move to server-side)
  const filteredIncidents = allIncidents.filter((incident) => {
    const matchesSearch =
      incident.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (incident.name?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
      (incident.category?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false);

    const matchesDisposition =
      dispositionFilter === "all" ||
      incident.action?.toLowerCase() === dispositionFilter.toLowerCase();

    const matchesCategory =
      categoryFilter === "all" ||
      incident.category?.toLowerCase() === categoryFilter.toLowerCase();

    const matchesSeverity =
      severityFilter === "all" || incident.severity === severityFilter;

    return (
      matchesSearch && matchesDisposition && matchesCategory && matchesSeverity
    );
  });

  // Calculate pagination for filtered results
  const totalFilteredItems = filteredIncidents.length;
  const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE);

  // Ensure current page is valid
  const validCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedIncidents = filteredIncidents.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    // Only reset page if we're not just clearing the search
    if (value !== "") {
      setCurrentPage(1);
    }
  };

  const handleDispositionChange = (value: string) => {
    setDispositionFilter(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleSeverityChange = (value: string) => {
    setSeverityFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const RenderContent = () => {
    if (isFetching) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-2">
            <Loader size="sm" />
            <div className="text-neutral-600 dark:text-neutral-300">
              Loading incidents...
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-8">
          <div className="text-destructive">
            Error loading incidents. Please try again.
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        {/* Filters Section */}
        <IncidentsFilters
          searchTerm={searchTerm}
          dispositionFilter={dispositionFilter}
          categoryFilter={categoryFilter}
          severityFilter={severityFilter}
          onSearchChange={handleSearchChange}
          onDispositionChange={handleDispositionChange}
          onCategoryChange={handleCategoryChange}
          onSeverityChange={handleSeverityChange}
        />

        {/* Table Section */}
        <IncidentsTable incidents={paginatedIncidents} />

        {/* Pagination Section */}
        <IncidentsPagination
          currentPage={validCurrentPage}
          totalPages={totalPages}
          totalItems={totalFilteredItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Incidents"
          description="Monitor, manage and review security incidents detected within the SOC environment"
        />
        <Button
          variant="outline"
          onClick={() => refetch()}
          className="cursor-pointer"
        >
          <RefreshCw
            className={cn("h-4 w-4", isRefetching && "animate-spin")}
          />
          <p>Refresh Incidents</p>
        </Button>
      </div>

      <RenderContent />
    </div>
  );
}
