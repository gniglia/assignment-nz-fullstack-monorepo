import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react";

type ErrorPageProps = {
  error?: Error;
  resetError?: () => void;
};

export default function ErrorPage({ error, resetError }: ErrorPageProps) {
  const routeError = useRouteError();

  // Determine the error type and message
  const getErrorInfo = () => {
    if (error) {
      return {
        status: 500,
        statusText: "Internal Server Error",
        message: error.message,
        isRouteError: false,
      };
    }

    if (isRouteErrorResponse(routeError)) {
      return {
        status: routeError.status,
        statusText: routeError.statusText,
        message: routeError.data?.message || routeError.statusText,
        isRouteError: true,
      };
    }

    if (routeError instanceof Error) {
      return {
        status: 500,
        statusText: "Internal Server Error",
        message: routeError.message,
        isRouteError: true,
      };
    }

    return {
      status: 500,
      statusText: "Unknown Error",
      message: "Something went wrong",
      isRouteError: true,
    };
  };

  const {
    status: errorStatus,
    statusText: errorStatusText,
    message: errorMessage,
  } = getErrorInfo();

  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-8">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        {/* Error Status */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {errorStatus}
          </h1>
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            {errorStatusText}
          </h2>
          <p className="text-sm text-gray-600">{errorMessage}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button onClick={handleRetry} className="flex-1" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>

          <Link to="/" className="block">
            <Button variant="ghost" className="w-full" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-500 mt-6">
          If this problem persists, please contact support.
        </p>
      </Card>
    </div>
  );
}
