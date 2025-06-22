import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  percentage: number;
  isPositive: boolean;
}

const divStyle =
  "border rounded-full p-2 border-neutral-700 hover:filter-[drop-shadow(0_0_2px_rgba(84,103,187,0.8))_drop-shadow(0_0_8px_rgba(84,103,187,0.6))_drop-shadow(0_0_15px_rgba(84,103,187,0.4))] transition-all";

const signStyle =
  "h-6 w-6 text-white filter-[drop-shadow(0_0_2px_rgba(255,255,255,0.8))_drop-shadow(0_0_8px_rgba(255,255,255,0.6))_drop-shadow(0_0_15px_rgba(255,255,255,0.4))]";

const cardTitleStyle =
  "text-sm font-extralight border rounded-md border-neutral-700 px-2 py-1 hover:cursor-pointer hover:bg-neutral-900 transition-all";

export function StatCard({
  icon: Icon,
  title,
  value,
  percentage,
  isPositive,
}: StatCardProps) {
  return (
    <Card className="grid gap-4 text-slate-50 bg-[#1E1F28] border-0">
      <CardHeader className="flex mb-4 flex-row items-center justify-between">
        <div className={divStyle}>
          <Icon className={signStyle} />
        </div>
        <CardTitle className={cardTitleStyle}>View Details</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <h1 className="text-sm md:text-base text-neutral-500">{title}</h1>
        <div className="flex items-center justify-center">
          <h1 className="flex-grow text-3xl md:text-4xl">{value}</h1>
          <p
            className={`border border-neutral-700 rounded-3xl px-2 flex items-center cursor-default ${
              isPositive
                ? "bg-gradient-to-t from-green-500/90 to-green-900/50"
                : "bg-gradient-to-t from-red-500/90 to-red-900/50"
            }`}
          >
            <ArrowUp className="h-4 w-4" />
            {percentage}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
