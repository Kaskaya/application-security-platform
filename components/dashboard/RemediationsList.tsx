import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RemediationItem } from "./RemediationItem";

interface Vulnerability {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  riskScore: number;
}

interface RemediationsListProps {
  remediations: Vulnerability[];
}

export function RemediationsList({ remediations }: RemediationsListProps) {
  return (
    <Card className="w-full bg-[#1E1F28] border-0 text-slate-50">
      <CardHeader className="border-b border-neutral-950">
        <CardTitle className="text-lg md:text-xl">Top Remediations</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {remediations.length > 0 ? (
          remediations.map((item) => (
            <RemediationItem
              key={item.createdAt}
              id={item.id}
              title={item.title}
              riskScore={item.riskScore}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            There is no item here
          </div>
        )}
      </CardContent>
    </Card>
  );
}
