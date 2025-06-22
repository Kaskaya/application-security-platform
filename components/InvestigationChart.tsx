"use client";

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// The data for the chart remains the same
const chartData = [
  { name: "d1", barValue: 75, dotPosition: 90 },
  { name: "d2", barValue: 20, dotPosition: 35 },
  { name: "d3", barValue: 1, dotPosition: 15 },
  { name: "d4", barValue: 45, dotPosition: 60 },
  { name: "d5", barValue: 20, dotPosition: 35 },
  { name: "d6", barValue: 60, dotPosition: 75 },
  { name: "d7", barValue: 95, dotPosition: 110 },
  { name: "d8", barValue: 40, dotPosition: 55 },
  { name: "d9", barValue: 75, dotPosition: 90 },
  { name: "d10", barValue: 15, dotPosition: 30 },
  { name: "d11", barValue: 50, dotPosition: 65 },
  { name: "d12", barValue: 80, dotPosition: 95 },
  { name: "d13", barValue: 15, dotPosition: 30 },
  { name: "d14", barValue: 40, dotPosition: 55 },
  { name: "d15", barValue: 55, dotPosition: 70 },
  { name: "d10", barValue: 15, dotPosition: 30 },
  { name: "d11", barValue: 50, dotPosition: 65 },
  { name: "d12", barValue: 80, dotPosition: 95 },
  { name: "d13", barValue: 15, dotPosition: 30 },
];

// --- NEWLY ADDED PART 1: The Custom Shape Component ---
// This component receives props from Recharts for each bar and renders our custom SVG.
const CustomBarShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { barValue, dotPosition } = payload;

  // Calculate the Y coordinate for the orange dot based on its value
  const dotY = y + height * (1 - dotPosition / barValue);

  return (
    <g>
      {/* The gray vertical bar */}
      <rect
        x={x + width / 4} // Center the bar
        y={y}
        width={width / 2} // Make the bar thinner
        height={height}
        rx="4" // Rounded top
        ry="4" // Rounded top
        fill="#3A3A45" // Gray color
      />
      {/* The orange dot */}
      <circle
        cx={x + width / 2} // Center the dot horizontally
        cy={dotY}
        r="6" // Radius of the dot
        fill="#f59e0b" // Orange color
      />
    </g>
  );
};

export function InvestigationChart() {
  return (
    <Card className="group py-0 bg-[#1E1F28] text-white border-0 ">
      <CardHeader className="flex flex-col items-start gap-4 space-y-0 border-0 px-6 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl ">
            Time to Assign and Close Investigations
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-6">
        {" "}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-md text-gray-400 ">
          <div className="flex  items-center justify-center gap-2 ">
            <span className="text-white font-bold">15%</span> in average time to
            close in last 90d
          </div>
        </div>
        {/* --- The Chart --- */}
        <div className="h-[150px] w-full mt-4 border-3 rounded-2xl border-neutral-900 px-2 py-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" hide />
              <YAxis hide domain={[0, "dataMax + 10"]} />

              <Bar dataKey="barValue" shape={<CustomBarShape />} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-start gap-2 mt-4 text-gray-400 ">
          <div className="flex w-full items-center justify-between ">
            <div className="flex  items-center justify-center gap-2">
              <div className="w-4 h-4  rounded-full bg-[#f59e0b] "></div>
              <span>Average time to Assign</span>
            </div>
            <span className="text-gray-50">%20</span>
          </div>
          <div className="flex w-full items-center justify-between ">
            <div className="flex  items-center justify-center gap-2">
              <div className="w-4 h-4  rounded-full bg-neutral-600 "></div>
              <span>Average time to Close</span>
            </div>
            <span className="text-gray-50">%12</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
