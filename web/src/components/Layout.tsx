import { Outlet } from "react-router";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
};
