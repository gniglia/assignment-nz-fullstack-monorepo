export function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        <p className="mt-2 text-sm text-gray-500">
          Please wait while we load the page
        </p>
      </div>
    </div>
  );
}
