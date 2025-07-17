"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Initialize auth state from localStorage
    checkAuth();
    setIsLoading(false);
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
