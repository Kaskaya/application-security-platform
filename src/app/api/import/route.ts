import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const importDataFilePath = path.join(
  process.cwd(),
  "data",
  "vulnerabilities.json"
);

const readImportData = async () => {
  try {
    const fileData = await fs.readFile(importDataFilePath, "utf-8");
    return fileData.trim() ? JSON.parse(fileData) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
};

export async function POST(request: Request) {
  try {
    const existingData = await readImportData();
    const { data: importedData } = await request.json();
    if (!Array.isArray(importedData)) {
      return NextResponse.json(
        { message: "Invalid data format." },
        { status: 400 }
      );
    }
    const now = new Date().toISOString();

    const newVulnerabilities = importedData.map((item: any) => ({
      title: item.title || "Başlık Yok",
      description: item.description || "Açıklama Yok",
      severity: item.severity || "Medium",
      status: item.status || "Open",
      cve: item.cve || "",
      affectedComponent: item.affectedComponent || "Bilinmiyor",
      reportedBy: item.reportedBy || "İçe Aktarma",
      riskScore: item.riskScore || 0,
      id: item.id || uuidv4(),
      createdAt: item.createdAt || now,
      updatedAt: now, // Always update the updatedAt timestamp
    }));

    // Create a map of existing data by ID for quick lookup
    const existingDataMap = new Map(
      existingData.map((item: any) => [item.id, item])
    );

    let updatedCount = 0;
    let addedCount = 0;

    // Process each imported vulnerability
    newVulnerabilities.forEach((newItem) => {
      if (existingDataMap.has(newItem.id)) {
        // Update existing record
        existingDataMap.set(newItem.id, newItem);
        updatedCount++;
      } else {
        // Add new record
        existingDataMap.set(newItem.id, newItem);
        addedCount++;
      }
    });

    // Convert map back to array
    const combinedData = Array.from(existingDataMap.values());

    await fs.writeFile(
      importDataFilePath,
      JSON.stringify(combinedData, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      message: "Data imported successfully",
      updated: updatedCount,
      added: addedCount,
      total: combinedData.length,
    });
  } catch (error) {
    console.error("Import API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
