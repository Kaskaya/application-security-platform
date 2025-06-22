import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "vulnerabilities.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileContent = await fs.readFile(dataFilePath, "utf8");
    const vulnerabilities = JSON.parse(fileContent);
    const vulnerability = vulnerabilities.find((v: any) => v.id === params.id);

    if (!vulnerability) {
      return NextResponse.json(
        { message: "Vulnerability not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(vulnerability);
  } catch (error) {
    console.error("Failed to read vulnerabilities data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
