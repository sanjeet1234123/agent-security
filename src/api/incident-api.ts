import axiosInstance, { createAxiosInstance } from "@/lib/axios-middleware";
import { PaginatedIncidents } from "@/types/incident-type";
import type {
  AdminDecisionParams,
  ApprovalIncidentParams,
  ApprovalIncidentResponse,
  Incident,
  IncidentPaginationParams,
  IncidentStatusRequest,
  SendPDFMailParams,
} from "@/types/incident-type";

class IncidentApi {
  private orchestratorAxiosInstance = createAxiosInstance("orchestrator");

  async getIncidents(
    params?: IncidentPaginationParams
  ): Promise<PaginatedIncidents> {
    const queryParams = new URLSearchParams();

    const page = params?.page ?? 1;
    const pageSize = params?.page_size ?? 10;

    queryParams.append("page", page.toString());
    queryParams.append("page_size", pageSize.toString());

    const response = await axiosInstance.get<PaginatedIncidents>(
      `/incidents?${queryParams.toString()}`
    );
    return response.data;
  }

  async getIncidentById(incidentId: number) {
    const response = await axiosInstance.get<Incident>(
      `/incidents/${incidentId}`
    );
    return response.data;
  }

  async postAdminDecision(params: AdminDecisionParams) {
    const response = await this.orchestratorAxiosInstance.post(
      "/orchestrator",
      {
        user_input: params.user_input,
        conversation_id: params.conversation_id,
      }
    );
    return response.data;
  }

  async patchIncident(params: ApprovalIncidentParams) {
    const response = await axiosInstance.patch<ApprovalIncidentResponse>(
      `/incidents/approval`,
      {
        incident_id: params.incident_id,
        is_approved: params.is_approved,
      }
    );
    return response.data;
  }

  async patchIncidentStatus(params: IncidentStatusRequest) {
    const response = await axiosInstance.patch(
      `/incidents/${params.incident_id}/status`,
      { status: params.status }
    );
    return response.data;
  }

  async postSendPDFMail(params: SendPDFMailParams) {
    const now = new Date();
    const datePart = now.toISOString().split("T")[0];
    const timePart = now.toTimeString().split(" ")[0].replace(/:/g, "-");
    const defaultFilename = `agentsoc-report-${datePart}-${timePart}.pdf`;

    const formData = new FormData();
    formData.append("file", params.pdf, defaultFilename);
    formData.append("to_email", params.email);

    const response = await axiosInstance.post("/send-pdf-email", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

const incidentApi = new IncidentApi();
export default incidentApi;
