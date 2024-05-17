import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type User = {
  id: number;
  username: string;
  avatar_url: string;
  create_at: string;
};

type UserStore = {
  user?: User;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: undefined,
      setUser(user) {
        set({ user });
      },
      logout: () => {
        set({ user: undefined });
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
