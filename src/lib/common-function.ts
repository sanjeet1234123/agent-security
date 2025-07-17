export const getDispositionBadgeColor = (status: string | null) => {
  if (!status)
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

  switch (status) {
    case "Needs Attention":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Contained":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Cleared":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export const getSeverityBadgeColor = (severity: string | null) => {
  if (!severity)
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";

  switch (severity.toLowerCase()) {
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "info":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export const getStatusBadgeColor = (status: string | null) => {
  if (!status)
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "closed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export function capitalizeText(input: unknown): string {
  if (typeof input !== "string") return "";

  const trimmed = input.trim();
  if (!trimmed) return "";

  return trimmed
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
