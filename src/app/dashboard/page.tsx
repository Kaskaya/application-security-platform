import { promises as fs } from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { RemediationsList } from "@/components/dashboard/RemediationsList";
import { InvestigationsList } from "@/components/dashboard/InvestigationsList";

interface Vulnerability {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  createdAt: string;
  riskScore: number;
}

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }

  const dataPath = path.join(process.cwd(), "data/vulnerabilities.json");
  const fileContents = await fs.readFile(dataPath, "utf8");
  const vulnerabilities: Vulnerability[] = JSON.parse(fileContents);

  const topVulnerabilities = [...vulnerabilities]
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  const topFixedRemediations = [...vulnerabilities]
    .filter((item) => item.status === "Resolved")
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  return (
    <main className="bg-[#16171D] w-full rounded-b-4xl flex flex-col gap-4 p-4 md:p-8 text-slate-50">
      <div className="">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-slate-50">
          Your Security Program
        </h2>
      </div>

      <StatsCards />

      <ChartsSection />

      <div className="flex flex-col 2xl:flex-row gap-4 text-xl">
        <RemediationsList remediations={topFixedRemediations} />
        <InvestigationsList vulnerabilities={topVulnerabilities} />
      </div>
    </main>
  );
}
