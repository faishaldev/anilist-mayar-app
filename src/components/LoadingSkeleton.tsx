interface LoadingSkeletonProps {
  count?: number;
}

export function LoadingSkeleton({ count = 10 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-muted rounded-lg h-64 mb-4" />
          <div className="space-y-2">
            <div className="bg-muted h-4 rounded" />
            <div className="bg-muted h-3 rounded w-3/4" />
            <div className="bg-muted h-3 rounded w-1/2" />
          </div>
        </div>
      ))}
    </>
  );
}
