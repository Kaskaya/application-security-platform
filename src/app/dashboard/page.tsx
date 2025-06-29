import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
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

  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Fetch vulnerabilities from Supabase
  const { data: vulnerabilities, error } = await supabase
    .from("vulnerabilities")
    .select("*")
    .order("risk_score", { ascending: false });

  if (error) {
    console.error("Error fetching vulnerabilities:", error);
    // Return empty arrays if there's an error
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
          <RemediationsList remediations={[]} />
          <InvestigationsList vulnerabilities={[]} />
        </div>
      </main>
    );
  }

  // Transform data to match expected format
  const transformedVulnerabilities: Vulnerability[] = vulnerabilities.map(
    (vuln: any) => ({
      id: vuln.id,
      title: vuln.title,
      severity: vuln.severity,
      status: vuln.status,
      createdAt: vuln.created_at,
      riskScore: vuln.risk_score,
    })
  );

  const topVulnerabilities = transformedVulnerabilities.slice(0, 4);

  const topFixedRemediations = transformedVulnerabilities
    .filter((item) => item.status === "Resolved")
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
