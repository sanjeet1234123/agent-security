/**
 * Environment utility functions
 */

/**
 * Get the current environment
 */
export const getEnvironment = (): string => {
  return process.env.NEXT_PUBLIC_ENV || "development";
};

/**
 * Check if the current environment is production
 */
export const isProduction = (): boolean => {
  return getEnvironment() === "production";
};

/**
 * Check if the current environment is staging
 */
export const isStaging = (): boolean => {
  return getEnvironment() === "staging";
};

/**
 * Check if the current environment is development
 */
export const isDevelopment = (): boolean => {
  return getEnvironment() === "development";
};

/**
 * Get the API URL based on the current environment
 */
export const getApiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
  }

  const apiUrl = url + "/api";

  return apiUrl;
};

export const getOrchestratorApiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_ORCHESTRATOR_API_URL;
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_ORCHESTRATOR_API_URL environment variable is not defined"
    );
  }

  const apiUrl = url + "/agent";

  return apiUrl;
};
