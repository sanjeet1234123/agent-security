"use client";

import { useAuthRedirect } from "@/hooks/use-auth-redirect";

export default function HomePage() {
  const { isAuthenticated } = useAuthRedirect();

  // Show loading state while redirect happens
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {isAuthenticated
            ? "Redirecting to incidents..."
            : "Redirecting to login..."}
        </p>
      </div>
    </div>
  );
}
