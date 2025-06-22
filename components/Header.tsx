"use client";

import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="flex h-16 items-center gap-4 bg-[#16171D] text-slate-200 px-6 sticky top-0 z-30 rounded-t-4xl">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden bg-transparent border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">Command Platform</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="h-8 gap-1  bg-[#16171D] ">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-gray-500 ">
              Rapid Supplies
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-gray-800 border-slate-900 text-gray-200"
        >
          {/* Menü sadece göstermelik, içindeki öğe seçilmiyor */}
          <DropdownMenuItem disabled>Rapid Supplies</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
