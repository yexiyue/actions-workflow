import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Layout } from "@/components/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      ErrorBoundary: ErrorBoundary,
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
          lazy: () => import("@/pages/center"),
          children: [
            {
              index: true,
              path: "favorite",
              lazy: () => import("@/pages/center/Favorite"),
            },
            {
              path: "mine",
              lazy: () => import("@/pages/center/Mine"),
            },
            {
              path: "admin",
              children: [
                {
                  path: "category",
                  lazy: () => import("@/pages/center/admin/Category"),
                },
                {
                  path: "tag",
                  lazy: () => import("@/pages/center/admin/Tag"),
                },
              ],
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
  ],
  {
    basename: "/actions-workflows",
  }
);
