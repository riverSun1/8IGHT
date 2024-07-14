import { create } from "zustand";

interface SearchState {
  job: string;
  edu: string;
  location: string;
  setJob: (job: string) => void;
  setEdu: (edu: string) => void;
  setLocation: (location: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  job: "",
  edu: "",
  location: "",
  setJob: (job) => set({ job }),
  setEdu: (edu) => set({ edu }),
  setLocation: (location) => set({ location }),
}));

export default useSearchStore;
