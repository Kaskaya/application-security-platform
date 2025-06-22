"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  useVulnerabilityStore,
  Vulnerability,
} from "@/store/vulnerabilityStore";
import { ActionBar } from "@/components/vulnerabilities/ActionBar";
import { VulnerabilityTable } from "@/components/vulnerabilities/VulnerabilityTable";
import { PaginationControls } from "@/components/vulnerabilities/PaginationControls";
import { VulnerabilityModal } from "@/components/vulnerabilities/VulnerabilityModal";
import { DeleteConfirmationModal } from "@/components/vulnerabilities/DeleteConfirmationModal";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const VulnerabilitiesClient = () => {
  const {
    vulnerabilities,
    isLoading,
    error,
    fetchVulnerabilities,
    addVulnerability,
    updateVulnerability,
    deleteVulnerability,
    importVulnerabilities,
    currentPage,
    totalPages,
    totalCount,
  } = useVulnerabilityStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Vulnerability | null>(null);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Vulnerability | null;
    direction: "ascending" | "descending";
  }>({ key: "riskScore", direction: "descending" });

  const jsonInputRef = useRef<HTMLInputElement>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchVulnerabilities(
      1,
      10,
      searchTerm,
      sortConfig.key,
      sortConfig.direction
    );
  }, [searchTerm, sortConfig, fetchVulnerabilities]);

  const handlePageChange = (page: number) => {
    fetchVulnerabilities(
      page,
      10,
      searchTerm,
      sortConfig.key,
      sortConfig.direction
    );
  };

  const handleSort = (key: keyof Vulnerability) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSave = async (
    formData: Omit<Vulnerability, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      if (currentItem) {
        await updateVulnerability(
          {
            ...formData,
            id: currentItem.id,
            createdAt: currentItem.createdAt,
            updatedAt: "",
          },
          searchTerm
        );
        toast.success("Vulnerability updated successfully!");
      } else {
        setSearchTerm("");
        await addVulnerability(formData);
        toast.success("Vulnerability added successfully!");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      if (currentItem?.id) {
        await deleteVulnerability(currentItem.id, searchTerm);
        toast.success("Vulnerability deleted successfully!");
      }
      setIsDeleteModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "json" | "csv"
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show loading toast
    const loadingToast = toast.loading(
      `Uploading ${fileType.toUpperCase()} file...`
    );

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        let newData = [];
        if (fileType === "json") {
          newData = JSON.parse(content);
        } else {
          const lines = content
            .split(/\r\n|\n/)
            .filter((line) => line.trim() !== "");
          const headers: (keyof Omit<
            Vulnerability,
            "id" | "createdAt" | "updatedAt"
          >)[] = lines[0].split(",").map((h) => h.trim() as any);
          newData = lines.slice(1).map((line) => {
            const values = line.split(",");
            const entry: any = {};
            headers.forEach((header, index) => {
              const value = values[index]?.trim();
              entry[header] =
                header === "riskScore" ? parseInt(value, 10) || 0 : value;
            });
            return entry;
          });
        }
        const importResult = await importVulnerabilities(newData);

        // Dismiss loading toast and show success with detailed info
        toast.dismiss(loadingToast);

        if (importResult.updated > 0 && importResult.added > 0) {
          toast.success(
            `${fileType.toUpperCase()} data imported successfully!`,
            {
              description: `${importResult.added} new vulnerabilities added, ${importResult.updated} existing vulnerabilities updated`,
            }
          );
        } else if (importResult.updated > 0) {
          toast.success(
            `${fileType.toUpperCase()} data imported successfully!`,
            {
              description: `${importResult.updated} existing vulnerabilities updated`,
            }
          );
        } else {
          toast.success(
            `${fileType.toUpperCase()} data imported successfully!`,
            {
              description: `${importResult.added} new vulnerabilities added`,
            }
          );
        }
      } catch (error) {
        console.error("Error reading file:", error);

        // Dismiss loading toast and show error
        toast.dismiss(loadingToast);
        toast.error("Failed to import file", {
          description: "Please check your file format and try again.",
        });
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  return (
    <div className="bg-[#16171D] text-gray-200 p-4 md:p-8 font-sans rounded-b-4xl">
      <div className=" mx-auto ">
        <header className="mb-4 ">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white mb-2">
            Vulnerability Management Panel
          </h1>
          <p className="text-sm md:text-base text-gray-400 ml-1">
            View, manage and report all vulnerabilities
          </p>
        </header>

        <ActionBar
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onJsonImport={() => jsonInputRef.current?.click()}
          onCsvImport={() => csvInputRef.current?.click()}
          onAddNew={() => setIsModalOpen(true)}
        />

        <input
          type="file"
          ref={jsonInputRef}
          onChange={(e) => handleFileUpload(e, "json")}
          accept=".json"
          className="hidden"
        />
        <input
          type="file"
          ref={csvInputRef}
          onChange={(e) => handleFileUpload(e, "csv")}
          accept=".csv"
          className="hidden"
        />

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg mb-6 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <p>{error}</p>
          </div>
        )}

        <VulnerabilityTable
          vulnerabilities={vulnerabilities}
          isLoading={isLoading}
          onEdit={(item) => {
            setCurrentItem(item);
            setIsModalOpen(true);
          }}
          onDelete={(item) => {
            setCurrentItem(item);
            setIsDeleteModalOpen(true);
          }}
          onSort={handleSort}
          sortConfig={sortConfig}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </div>

      {isModalOpen && (
        <VulnerabilityModal
          item={currentItem}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentItem(null);
          }}
        />
      )}

      {isDeleteModalOpen && currentItem && (
        <DeleteConfirmationModal
          itemTitle={currentItem.title}
          onConfirm={confirmDelete}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default VulnerabilitiesClient;
