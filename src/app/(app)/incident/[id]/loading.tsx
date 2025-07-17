import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col h-full gap-4">
      {/* Back button skeleton */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-muted animate-pulse rounded-md">
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          <div className="h-4 w-24 bg-muted-foreground/20 rounded" />
        </div>
      </div>

      {/* Page content skeleton */}
      <div className="flex flex-col h-full gap-8">
        {/* Page header skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded-md" />
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="grid gap-6">
            {/* Card 1 skeleton */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-32 bg-muted animate-pulse rounded-md" />
                <div className="h-6 w-20 bg-green-100 animate-pulse rounded-full" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
                <div className="h-16 w-full bg-muted animate-pulse rounded-md" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
                    <div className="h-4 w-28 bg-muted animate-pulse rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
                    <div className="h-4 w-28 bg-muted animate-pulse rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 skeleton */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="h-6 w-48 bg-muted animate-pulse rounded-md mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="grid gap-6">
            {/* Card 3 skeleton */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="h-6 w-32 bg-muted animate-pulse rounded-md mb-4" />
              <div className="space-y-4">
                <div className="h-4 w-40 bg-muted animate-pulse rounded-md" />
                <div className="h-16 w-full bg-muted animate-pulse rounded-md" />
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded-md" />
                      <div className="h-4 w-20 bg-muted animate-pulse rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4 skeleton */}
            <div className="border rounded-lg p-6 bg-card">
              <div className="h-6 w-40 bg-muted animate-pulse rounded-md mb-4" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-muted animate-pulse rounded-md" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded-md" />
                <div className="flex gap-3 mt-6">
                  <div className="h-10 w-24 bg-green-100 animate-pulse rounded-md" />
                  <div className="h-10 w-24 bg-red-100 animate-pulse rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
