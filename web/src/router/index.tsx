import { Auth } from "@/components/Auth";
import { Layout } from "@/components/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("@/pages/Home"),
      },
      {
        path: "template/:id",
        lazy: () => import("@/pages/templates"),
      },
      {
        path: "tag/:id",
        lazy: () => import("@/pages/tags"),
      },
      {
        path: "user/:id",
        lazy: () => import("@/pages/users"),
      },
      {
        path: "user-center",
        element: <Auth />,
        children: [
          {
            index: true,
            lazy: () => import("@/pages/center"),
          },
        ],
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
