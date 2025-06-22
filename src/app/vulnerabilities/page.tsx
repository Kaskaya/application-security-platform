import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import VulnerabilitiesClient from "./VulnerabilitiesClient";

export default async function VulnerabilitiesPage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }
  return <VulnerabilitiesClient />;
}
