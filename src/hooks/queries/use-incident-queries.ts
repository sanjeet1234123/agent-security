import { useQuery } from "@tanstack/react-query";
import incidentApi from "@/api/incident-api";
import type { IncidentPaginationParams } from "@/types/incident-type";

export function useGetIncidents(params?: IncidentPaginationParams) {
  return useQuery({
    queryKey: ["incidents", params?.page, params?.page_size],
    queryFn: () => incidentApi.getIncidents(params),
    retry: 3,
  });
}

export function useGetIncidentById(incidentId: number) {
  return useQuery({
    queryKey: ["incident", incidentId],
    queryFn: () => incidentApi.getIncidentById(incidentId),
    enabled: !!incidentId,
  });
}
