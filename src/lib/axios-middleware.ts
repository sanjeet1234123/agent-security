import axios from "axios";
import { getApiUrl, getOrchestratorApiUrl } from "./env";

type ApiType = "default" | "orchestrator";

const createAxiosInstance = (type: ApiType = "default") => {
  const baseURL =
    type === "orchestrator" ? getOrchestratorApiUrl() : getApiUrl();

  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // instance.interceptors.request.use((config) => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  return instance;
};

// Default instance for backward compatibility
const axiosInstance = createAxiosInstance();

export default axiosInstance;
export { createAxiosInstance };
export type { ApiType };
