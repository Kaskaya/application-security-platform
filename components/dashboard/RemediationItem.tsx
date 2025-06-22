import Link from "next/link";
import { Cloud } from "lucide-react";

interface RemediationItemProps {
  id: string;
  title: string;
  riskScore: number;
  createdAt: string;
}

export function RemediationItem({
  id,
  title,
  riskScore,
  createdAt,
}: RemediationItemProps) {
  return (
    <Link href={`/vulnerabilities/${id}`} className="block group" tabIndex={0}>
      <div className="flex flex-col sm:flex-row items-center justify-between text-gray-400 text-base gap-2 cursor-pointer group-hover:bg-[#16171D] rounded-lg px-2 py-1 transition-colors">
        <div className="flex items-center rounded-md w-full sm:w-auto">
          <Cloud className="w-10 h-10 sm:w-12 sm:h-12 mr-4 border-2 rounded-full p-2 border-neutral-900 group-hover:border-neutral-700 group-hover:bg-[#16171D] transition-all flex-shrink-0" />
          <span className="flex-grow truncate text-sm md:text-base">
            {title}
          </span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-[#24242F] text-gray-200 w-full sm:w-36 items-center justify-center text-center transition-all flex-shrink-0 text-sm md:text-base">
          Risk Score {riskScore}
        </div>
      </div>
    </Link>
  );
}
