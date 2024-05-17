import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/Layout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("@/pages/Home"),
      },
    ],
  },
  {
    path: "/login",
    lazy: () => import("@/pages/Login"),
  },
  {
    path: "/auth",
    lazy: () => import("@/pages/Authorized"),
  },
]);
