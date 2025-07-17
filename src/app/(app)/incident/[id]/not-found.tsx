import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function IncidentNotFound() {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-8">
      <Card className="w-full max-w-lg text-center">
        <CardHeader className="gap-2">
          <div className="flex justify-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Incident Not Found</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <p className="text-muted-foreground">
            The incident you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>

          <Button asChild className="w-full">
            <Link href="/incident">Back to Incidents</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
