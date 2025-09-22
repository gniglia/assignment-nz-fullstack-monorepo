import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./pages/Dashboard").then((mod) => ({
            Component: mod.default,
          })),
      },
      {
        path: "analytics",
        lazy: () =>
          import("./pages/Analytics").then((mod) => ({
            Component: mod.default,
          })),
      },
      {
        path: "users",
        lazy: () =>
          import("./pages/Users").then((mod) => ({ Component: mod.default })),
      },
    ],
  },
]);
