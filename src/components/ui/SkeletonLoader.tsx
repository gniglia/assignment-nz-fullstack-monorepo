import { Skeleton } from "./Skeleton";
import { Card } from "./Card";

export function MetricCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export function ChartsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-64 w-full" />
          </div>
        </Card>
      ))}
    </>
  );
}
