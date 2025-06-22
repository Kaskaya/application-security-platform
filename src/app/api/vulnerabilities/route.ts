import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataFilePath = path.join(process.cwd(), "data", "vulnerabilities.json");

const readData = async () => {
  try {
    const fileData = await fs.readFile(dataFilePath, "utf-8");
    return fileData ? JSON.parse(fileData) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
};

const writeData = async (data: any) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url, "http://localhost:3000");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const searchTerm = searchParams.get("search")?.toLowerCase() || "";
    const sortKey = searchParams.get("sortKey");
    const sortDirection = searchParams.get("sortDirection") || "ascending";

    const allData = await readData();

    // Remove duplicate IDs - keep the most recent one
    const uniqueData = allData.reduce((acc: any[], current: any) => {
      const existingIndex = acc.findIndex(
        (item: any) => item.id === current.id
      );
      if (existingIndex === -1) {
        acc.push(current);
      } else {
        // If duplicate found, keep the one with more recent updatedAt
        const existing = acc[existingIndex];
        const existingDate = new Date(existing.updatedAt || existing.createdAt);
        const currentDate = new Date(current.updatedAt || current.createdAt);
        if (currentDate > existingDate) {
          acc[existingIndex] = current;
        }
      }
      return acc;
    }, []);

    const filteredData = searchTerm
      ? uniqueData.filter((vuln: any) =>
          Object.values(vuln).some((value) =>
            String(value).toLowerCase().includes(searchTerm)
          )
        )
      : uniqueData;

    // Apply sorting
    if (sortKey) {
      const severityOrder: Record<string, number> = {
        Critical: 5,
        High: 4,
        Medium: 3,
        Low: 2,
        Informational: 1,
      };
      const statusOrder: Record<string, number> = {
        Open: 4,
        "In Progress": 3,
        Resolved: 2,
        Closed: 1,
      };

      filteredData.sort((a: any, b: any) => {
        let aValue: any;
        let bValue: any;

        switch (sortKey) {
          case "severity":
            aValue = severityOrder[a.severity] || 0;
            bValue = severityOrder[b.severity] || 0;
            break;
          case "status":
            aValue = statusOrder[a.status] || 0;
            bValue = statusOrder[b.status] || 0;
            break;
          case "riskScore":
            aValue = a.riskScore || 0;
            bValue = b.riskScore || 0;
            break;
          default:
            aValue = a[sortKey] || "";
            bValue = b[sortKey] || "";
            break;
        }

        if (aValue < bValue) {
          return sortDirection === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortDirection === "ascending" ? 1 : -1;
        }
        return 0;
      });
    } else {
      // Default sorting by createdAt if no sort key provided
      filteredData.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const totalCount = filteredData.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginatedData,
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
  const body = await request.json();
  const data = await readData();
  const now = new Date().toISOString();
  const newItem = {
    ...body,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  data.push(newItem);
  await writeData(data);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: Request) {
  const updatedItem = await request.json();
  const data = await readData();
  const itemIndex = data.findIndex((item: any) => item.id === updatedItem.id);
  if (itemIndex === -1) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  data[itemIndex] = {
    ...data[itemIndex],
    ...updatedItem,
    updatedAt: new Date().toISOString(),
  };
  await writeData(data);
  return NextResponse.json(data[itemIndex]);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url, "http://localhost:3000");
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ message: "ID is required" }, { status: 400 });

  const data = await readData();
  const filteredData = data.filter((item: any) => item.id !== id);

  if (data.length === filteredData.length) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  await writeData(filteredData);
  return new Response(null, { status: 204 });
}
