import { create } from "zustand";
import { Incident } from "@/types/incident-type";

interface IncidentStore {
  selectedIncident: Incident | null;
  setSelectedIncident: (incident: Incident) => void;
  clearSelectedIncident: () => void;
}

export const useIncidentStore = create<IncidentStore>((set) => ({
  selectedIncident: null,
  setSelectedIncident: (incident: Incident) =>
    set({ selectedIncident: incident }),
  clearSelectedIncident: () => set({ selectedIncident: null }),
}));
