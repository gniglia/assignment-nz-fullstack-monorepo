import { LoadingSpinner } from "./ui/LoadingSpinner";

export function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-8">
        <LoadingSpinner size="xl" className="mx-auto" />
        <div className="space-y-3">
          <p className="text-xl font-semibold text-foreground">Loading...</p>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Please wait while we load the page
          </p>
        </div>
      </div>
    </div>
  );
}
