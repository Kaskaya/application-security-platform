import { FC, ChangeEvent } from "react";
import { Search, Plus, Upload, FileText } from "lucide-react";

interface ActionBarProps {
  searchTerm: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onJsonImport: () => void;
  onCsvImport: () => void;
  onAddNew: () => void;
}

export const ActionBar: FC<ActionBarProps> = ({
  searchTerm,
  onSearchChange,
  onJsonImport,
  onCsvImport,
  onAddNew,
}) => (
  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
    <div className="relative w-full md:max-w-md">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search by Title, Status, or Component Name..."
        value={searchTerm}
        onChange={onSearchChange}
        className="w-full pl-11 pr-4 py-2.5 bg-[#1E1F28] border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-neutral-500"
      />
    </div>
    <div className="flex items-center gap-2 w-full md:w-auto">
      <button
        onClick={onJsonImport}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 text-sm font-medium rounded-lg hover:bg-neutral-700 transition-all cursor-pointer"
      >
        <Upload size={16} />
        <span className="hidden sm:inline">JSON</span>
      </button>
      <button
        onClick={onCsvImport}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 text-sm font-medium rounded-lg hover:bg-neutral-700 transition-all cursor-pointer"
      >
        <FileText size={16} />
        <span className="hidden sm:inline">CSV</span>
      </button>
      <button
        onClick={onAddNew}
        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-sky-600/80 text-sm font-medium text-white rounded-lg hover:bg-sky-600 transition-all cursor-pointer whitespace-nowrap"
      >
        <Plus size={16} />
        <span className="hidden sm:inline">New Vulnerability</span>
      </button>
    </div>
  </div>
);
