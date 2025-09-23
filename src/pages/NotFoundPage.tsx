import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-50 mb-8">
          <AlertTriangle className="h-8 w-8 text-orange-500" />
        </div>

        {/* Error Status */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-sm text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="flex-1"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Link to="/" className="flex-1">
              <Button className="w-full" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-xs text-gray-500 mt-6">
          Check the URL or navigate to a different page.
        </p>
      </Card>
    </div>
  );
}
