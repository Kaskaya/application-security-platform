import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const searchTerm = searchParams.get("search")?.toLowerCase() || "";
    const sortKey = searchParams.get("sortKey");
    const sortDirection = searchParams.get("sortDirection") || "ascending";

    // Build the query
    let query = supabase.from("vulnerabilities").select("*");

    // Apply sorting
    if (sortKey) {
      const order = sortDirection === "descending" ? "desc" : "asc";
      switch (sortKey) {
        case "severity":
          query = query.order("severity", { ascending: order === "asc" });
          break;
        case "status":
          query = query.order("status", { ascending: order === "asc" });
          break;
        case "riskScore":
          query = query.order("risk_score", { ascending: order === "asc" });
          break;
        case "createdAt":
          query = query.order("created_at", { ascending: order === "asc" });
          break;
        case "updatedAt":
          query = query.order("updated_at", { ascending: order === "asc" });
          break;
        default:
          query = query.order(sortKey, { ascending: order === "asc" });
      }
    } else {
      // Default sorting by created_at descending
      query = query.order("created_at", { ascending: false });
    }

    // Get all data first (we'll filter in JavaScript)
    const { data: allData, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    // Filter data based on search term
    let filteredData = allData || [];
    if (searchTerm) {
      filteredData = allData.filter((item: any) => {
        const searchLower = searchTerm.toLowerCase();

        // Check text fields
        const textMatch =
          item.title?.toLowerCase().includes(searchLower) ||
          item.affected_component?.toLowerCase().includes(searchLower) ||
          item.severity?.toLowerCase().includes(searchLower) ||
          item.status?.toLowerCase().includes(searchLower);

        // Check numeric fields
        const numericMatch =
          item.risk_score?.toString() === searchTerm ||
          item.risk_score?.toString().includes(searchTerm);

        return textMatch || numericMatch;
      });
    }

    // Get total count for pagination
    const totalCount = filteredData.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;

    // Apply pagination
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    // Transform data to match the expected format
    const transformedData = paginatedData.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      severity: item.severity,
      status: item.status,
      cve: item.cve,
      affectedComponent: item.affected_component,
      reportedBy: item.reported_by,
      riskScore: item.risk_score,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }));

    return NextResponse.json({
      data: transformedData,
      totalCount,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("API GET Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = new Date().toISOString();

    // Transform the data to match database schema
    const newItem = {
      title: body.title,
      description: body.description,
      severity: body.severity,
      status: body.status,
      cve: body.cve,
      affected_component: body.affectedComponent,
      reported_by: body.reportedBy,
      risk_score: body.riskScore,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from("vulnerabilities")
      .insert([newItem])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Failed to create vulnerability" },
        { status: 500 }
      );
    }

    // Transform response to match expected format
    const response = {
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

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updatedItem = await request.json();
    const now = new Date().toISOString();

    // Transform the data to match database schema
    const updateData = {
      title: updatedItem.title,
      description: updatedItem.description,
      severity: updatedItem.severity,
      status: updatedItem.status,
      cve: updatedItem.cve,
      affected_component: updatedItem.affectedComponent,
      reported_by: updatedItem.reportedBy,
      risk_score: updatedItem.riskScore,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from("vulnerabilities")
      .update(updateData)
      .eq("id", updatedItem.id)
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "Item not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Failed to update vulnerability" },
        { status: 500 }
      );
    }

    // Transform response to match expected format
    const response = {
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

    return NextResponse.json(response);
  } catch (error) {
    console.error("API PUT Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("vulnerabilities")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json(
        { message: "Failed to delete vulnerability" },
        { status: 500 }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("API DELETE Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
