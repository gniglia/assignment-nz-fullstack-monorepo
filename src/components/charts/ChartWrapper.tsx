import React from "react";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { motion, AnimatePresence } from "framer-motion";
import { chartContainerVariants } from "@/lib/animations";

type ChartWrapperProps = {
  title?: string;
  isLoading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
  className?: string;
};

export function ChartWrapper({
  title,
  isLoading = false,
  error = null,
  isEmpty = false,
  emptyMessage = "No data available",
  children,
  className = "",
}: ChartWrapperProps) {
  return (
    <motion.div
      variants={chartContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      <Card variant="elevated" className="p-4 sm:p-6">
        {title && (
          <h3 className="text-lg font-medium text-foreground mb-4">{title}</h3>
        )}

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-64 flex items-center justify-center"
            >
              <LoadingSpinner size="md" />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-64 flex items-center justify-center"
            >
              <Alert variant="destructive">
                <AlertDescription>
                  Failed to load chart data: {error.message}
                </AlertDescription>
              </Alert>
            </motion.div>
          ) : isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-64 flex items-center justify-center text-muted-foreground"
            >
              <p>{emptyMessage}</p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-64"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
