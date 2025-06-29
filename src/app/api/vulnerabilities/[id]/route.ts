import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("vulnerabilities")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error("Supabase query error:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "Vulnerability not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    // Transform data to match the expected format
    const vulnerability = {
      id: data.id,
      title: data.title,
      description: data.description,
      severity: data.severity,
      status: data.status,
      cve: data.cve,
      affectedComponent: data.affected_component,
      reportedBy: data.reported_by,
      riskScore: data.risk_score,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return NextResponse.json(vulnerability);
  } catch (error) {
    console.error("Failed to read vulnerability data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
