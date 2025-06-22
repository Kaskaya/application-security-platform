import { CircleDollarSign, UsersRound, Redo, Cloud } from "lucide-react";
import { StatCard } from "./StatCard";

export function StatsCards() {
  const stats = [
    {
      icon: CircleDollarSign,
      title: "Total Assets",
      value: "21,268",
      percentage: 10,
      isPositive: true,
    },
    {
      icon: UsersRound,
      title: "Users",
      value: "22,221",
      percentage: 12,
      isPositive: false,
    },
    {
      icon: Redo,
      title: "External Assets",
      value: "1,921",
      percentage: 20,
      isPositive: true,
    },
    {
      icon: Cloud,
      title: "Cloud Assets",
      value: "347",
      percentage: 15,
      isPositive: true,
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
