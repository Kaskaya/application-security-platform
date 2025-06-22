import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect, notFound } from "next/navigation";
import { Vulnerability } from "@/store/vulnerabilityStore";
import ClientVulnerabilityDetail from "@/components/vulnerabilities/ClientVulnerabilityDetail";

export default async function VulnerabilityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }
  const { id } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = `${baseUrl}/api/vulnerabilities/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    notFound();
  }
  const vulnerability: Vulnerability = await res.json();
  return <ClientVulnerabilityDetail vulnerability={vulnerability} />;
}
