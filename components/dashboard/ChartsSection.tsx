import { Card, CardContent } from "@/components/ui/card";
import { MainChart } from "@/components/MainChart";
import { InvestigationChart } from "@/components/InvestigationChart";

export function ChartsSection() {
  return (
    <div className="grid gap-4 grid-cols-1 xl:grid-cols-7">
      <Card className="xl:col-span-4 bg-[#1E1F28] border-0 text-slate-50">
        <CardContent className="px-2">
          <MainChart />
        </CardContent>
      </Card>

      <Card className="xl:col-span-3 bg-[#1E1F28] border-0 text-slate-50">
        <InvestigationChart />
      </Card>
    </div>
  );
}
