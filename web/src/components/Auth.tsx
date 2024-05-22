import { useUserStore } from "@/stores/useUserStore";
import { Outlet } from "react-router";

export const Auth = () => {
  const [user] = useUserStore((store) => [store.user]);
  if (!user) {
    window.location.href = "/login";
    return null;
  } else {
    return <Outlet />;
  }
};
