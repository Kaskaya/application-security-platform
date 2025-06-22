import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VulnerabilityItem } from "./VulnerabilityItem";

interface Vulnerability {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  riskScore: number;
}

interface InvestigationsListProps {
  vulnerabilities: Vulnerability[];
}

export function InvestigationsList({
  vulnerabilities,
}: InvestigationsListProps) {
  return (
    <Card className="w-full bg-[#1E1F28] border-0 text-slate-50">
      <CardHeader className="border-b border-neutral-950">
        <CardTitle className="text-lg md:text-xl">
          Top Investigations By Priority
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {vulnerabilities.length > 0 ? (
          vulnerabilities.map((item) => (
            <VulnerabilityItem
              key={item.createdAt}
              id={item.id}
              title={item.title}
              severity={item.severity}
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
