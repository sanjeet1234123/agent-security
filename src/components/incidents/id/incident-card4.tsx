import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MITRE_MAP } from "../constant";
import type { MITRECategory } from "@/types/incident-type";
import chroma from "chroma-js";

interface MitreTechniquesSectionProps {
  category: string | null;
}

const isValidCategory = (cat: string): cat is MITRECategory => {
  return cat in MITRE_MAP;
};

export default function IncidentCard4({
  category,
}: MitreTechniquesSectionProps) {
  if (!category) return null;

  const normalizedCategory = category.toLowerCase().trim();
  if (!isValidCategory(normalizedCategory)) return null;

  const techniques = MITRE_MAP[normalizedCategory];
  if (!techniques || techniques.length === 0) return null;

  // Base pastel colors
  const baseColors = ["#FF6B6B", "#FFB84D", "#51CF66", "#8B5CF6"];

  // Generate pastel scale based on number of techniques
  const pastelScale = chroma
    .scale(baseColors)
    .mode("lab")
    .colors(techniques.length);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Violated Compliance</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-12 gap-4">
          {techniques.map((entry, index) => {
            const [techId, techName] = entry.split(" – ");
            const baseColor = pastelScale[index];
            const bgColor = chroma(baseColor).alpha(0.2).css(); // Apply transparency

            return (
              <Card
                key={techId}
                style={{ backgroundColor: bgColor }}
                className="col-span-6 border-0 text-black dark:text-white gap-3"
              >
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    {techId}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-accent-foreground">
                    {techName || "Unknown technique"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
