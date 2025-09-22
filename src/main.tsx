import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { router } from "@/router";
import { LoadingFallback } from "@/components/LoadingFallback";
import { ThemeProvider } from "@/components/ThemeProvider";
import { queryClient } from "@/utils/query-client";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--card-foreground))",
              border: "1px solid hsl(var(--border))",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "hsl(var(--success))",
                secondary: "hsl(var(--card-foreground))",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "hsl(var(--error))",
                secondary: "hsl(var(--card-foreground))",
              },
            },
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
