import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        if (email === "demo@xenonstack.com" && password === "xenon123") {
          const user = { email };
          set({ isAuthenticated: true, user });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      checkAuth: () => {
        const state = get();
        console.log("Checking authentication state:", state.isAuthenticated);
        // Here you can add logic to check if the user is still authenticated
        // This will be handled by the persist middleware
        // but you can add additional logic here if needed
      },
    }),
    {
      name: "auth-storage",
      // Only persist authentication state
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
