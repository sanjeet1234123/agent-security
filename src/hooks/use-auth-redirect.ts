"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function useAuthRedirect() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/overview");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated };
}
