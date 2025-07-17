import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import incidentApi from "@/api/incident-api";
import { showSuccessToast, showErrorToast } from "@/components/ui/sonner";
import type {
  AdminDecisionParams,
  ApprovalIncidentParams,
  IncidentStatusRequest,
  SendPDFMailParams,
} from "@/types/incident-type";

export function useAdminDecisionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AdminDecisionParams) =>
      incidentApi.postAdminDecision(params),
    onSuccess: () => {
      showSuccessToast({
        title: "Action updated",
        description: "The incident reverted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      queryClient.invalidateQueries({ queryKey: ["incident"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        showErrorToast({
          title: "Action failed",
          description:
            error.response?.data?.message || "An unexpected error occurred",
        });
      }
    },
  });
}

export function usePatchIncidentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: ApprovalIncidentParams) =>
      incidentApi.patchIncident(params),
    onSuccess: (data) => {
      showSuccessToast({
        title: "Action updated",
        description: "The incident has been updated successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["incident", data.incident_id],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        showErrorToast({
          title: "Action failed",
          description:
            error.response?.data?.message || "An unexpected error occurred",
        });
      }
    },
  });
}

export function usePatchIncidentStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IncidentStatusRequest) =>
      incidentApi.patchIncidentStatus(params),
    onSuccess: (data) => {
      showSuccessToast({
        title: "Incident status updated",
        description: `Incident ${data.incident_id} status changed to ${data.status}.`,
      });

      queryClient.invalidateQueries({
        queryKey: ["incident", data.incident_id],
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        showErrorToast({
          title: "Status update failed",
          description:
            error.response?.data?.message || "An unexpected error occurred",
        });
      }
    },
  });
}

export function useSendPDFMailMutation() {
  return useMutation({
    mutationFn: (params: SendPDFMailParams) =>
      incidentApi.postSendPDFMail(params),
    onSuccess: () => {
      showSuccessToast({
        title: "Email sent",
        description: "The PDF report has been sent successfully.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        showErrorToast({
          title: "Email sending failed",
          description:
            error.response?.data?.message || "An unexpected error occurred",
        });
      }
    },
  });
}
