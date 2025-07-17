import { RefreshCw } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col h-full gap-8">
      {/* Header section skeleton */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-96 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border bg-muted animate-pulse rounded-md">
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-28 bg-muted-foreground/20 rounded" />
        </div>
      </div>

      {/* Content section skeleton */}
      <div className="flex flex-col gap-6">
        {/* Filters section skeleton */}
        <div className="flex flex-col gap-4">
          {/* Search bar */}
          <div className="h-10 w-full bg-muted animate-pulse rounded-md" />

          {/* Filter dropdowns */}
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
            <div className="h-10 w-36 bg-muted animate-pulse rounded-md" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded-md" />
          </div>
        </div>

        {/* Table skeleton */}
        <div className="border rounded-lg">
          {/* Table header */}
          <div className="bg-muted/50 border-b">
            <div className="grid grid-cols-6 gap-4 p-4">
              <div className="h-4 w-20 bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-28 bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-20 bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded-md" />
              <div className="h-4 w-18 bg-muted animate-pulse rounded-md" />
            </div>
          </div>

          {/* Table rows */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="border-b last:border-b-0">
              <div className="grid grid-cols-6 gap-4 p-4">
                <div className="h-4 w-16 bg-muted animate-pulse rounded-md" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
                <div className="h-4 w-36 bg-muted animate-pulse rounded-md" />
                <div className="h-4 w-28 bg-muted animate-pulse rounded-md" />
                <div className="h-6 w-20 bg-blue-100 animate-pulse rounded-full" />
                <div className="h-6 w-16 bg-red-100 animate-pulse rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 bg-muted animate-pulse rounded-md" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
