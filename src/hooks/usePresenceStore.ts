import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PresenceState {
  membersId: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
}

export const usePresenceStore = create<PresenceState>()(
  devtools(
    (set) => ({
      membersId: [],
      add: (id) => set((state) => ({ membersId: [...state.membersId, id] })),
      remove: (id) =>
        set((state) => ({
          membersId: state.membersId.filter((memberId) => memberId !== id),
        })),
      set: (ids) => set({ membersId: ids }),
    }),
    { name: "presence-store" }
  )
);
