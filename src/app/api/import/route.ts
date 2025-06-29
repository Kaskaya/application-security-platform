import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { data: importedData } = await request.json();
    if (!Array.isArray(importedData)) {
      return NextResponse.json(
        { message: "Invalid data format." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    let updatedCount = 0;
    let addedCount = 0;

    // Process each imported vulnerability
    for (const item of importedData) {
      const vulnerabilityData = {
        title: item.title || "Untitled",
        description: item.description || "No description",
        severity: item.severity || "Medium",
        status: item.status || "Open",
        cve: item.cve || "",
        affected_component: item.affectedComponent || "Unknown",
        reported_by: item.reportedBy || "Import",
        risk_score: item.riskScore || 0,
        updated_at: now,
      };

      if (item.id) {
        // Try to update existing record
        const { data: existing, error: checkError } = await supabase
          .from("vulnerabilities")
          .select("id")
          .eq("id", item.id)
          .single();

        if (existing) {
          // Update existing record
          const { error: updateError } = await supabase
            .from("vulnerabilities")
            .update(vulnerabilityData)
            .eq("id", item.id);

          if (updateError) {
            console.error("Update error for ID", item.id, updateError);
          } else {
            updatedCount++;
          }
        } else {
          // Insert as new record
          const { error: insertError } = await supabase
            .from("vulnerabilities")
            .insert([vulnerabilityData]);

          if (insertError) {
            console.error("Insert error for item", item.title, insertError);
          } else {
            addedCount++;
          }
        }
      } else {
        // Insert as new record (no ID provided)
        const { error: insertError } = await supabase
          .from("vulnerabilities")
          .insert([vulnerabilityData]);

        if (insertError) {
          console.error("Insert error for item", item.title, insertError);
        } else {
          addedCount++;
        }
      }
    }

    return NextResponse.json({
      message: "Data imported successfully",
      updated: updatedCount,
      added: addedCount,
      total: updatedCount + addedCount,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { message: "Import failed", error: "Internal server error" },
      { status: 500 }
    );
  }
}
