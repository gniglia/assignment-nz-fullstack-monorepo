import { useEffect } from "react";

/**
 * Custom hook to conditionally lock body scroll
 * @param shouldLock - Whether to lock the body scroll
 */
export function useConditionalBodyLock(shouldLock: boolean) {
  useEffect(() => {
    if (shouldLock) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;

      // Lock the body scroll
      document.body.style.overflow = "hidden";

      // Cleanup function to restore original overflow
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [shouldLock]);
}
