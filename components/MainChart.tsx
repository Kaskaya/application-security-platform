"use client";

import * as React from "react";
import { Area, AreaChart, XAxis } from "recharts";
import chartdata from "@/data/chartdata.json";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Renamed data keys to match the new context from the image
const chartData = chartdata;

// Updated chartConfig to match the new data keys and labels
const chartConfig = {
  remediated: {
    label: "In Remediated",
    color: "#666666", // gray color
  },
  new: {
    label: "In New",
    color: "#f59e0b", // orange color
  },
} satisfies ChartConfig;

export function MainChart() {
  const [timeRange, setTimeRange] = React.useState("y");

  // NEW: State to track mouse position and hover status
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  // Updated filtering logic to handle D, M, Y, All
  const filteredData = React.useMemo(() => {
    const lastDataDate = new Date(chartData[chartData.length - 1].date);

    if (timeRange === "all" || timeRange === "custom") {
      return chartData;
    }

    let daysToSubtract = 0;
    switch (timeRange) {
      case "d":
        daysToSubtract = 7;
        break;
      case "m":
        daysToSubtract = 30;
        break;
      case "y":
      default:
        daysToSubtract = 365;
        break;
    }

    const startDate = new Date(lastDataDate);
    startDate.setDate(startDate.getDate() - daysToSubtract + 1);

    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate && date <= lastDataDate;
    });
  }, [timeRange]);

  // NEW: Handlers for mouse events on the chart container
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Card className="group py-0 bg-[#1E1F28] text-white border-0 ">
      <CardHeader className="flex flex-col items-start gap-4 space-y-0 border-0 px-6 sm:flex-row sm:items-center">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-xl pb-4">
            New And Remediated Vulnerabilities
          </CardTitle>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white">
            <div className="flex  items-center justify-center gap-2 ">
              <div className="w-2 h-4 rounded-full bg-[#f59e0b] "></div>
              <span className=" ">49.8%</span> In New
            </div>
            <div className="flex items-center justify-center gap-2 ">
              <div className="w-2 h-4 rounded-full bg-neutral-600 "></div>
              <span className=" ">368.3%</span> In Remediated
            </div>
          </div>
        </div>

        <ToggleGroup
          type="single"
          value={timeRange}
          onValueChange={(value) => {
            if (value) setTimeRange(value);
          }}
          className="flex items-center  rounded-md border border-gray-950 bg-neutral-[#1D1D28] "
        >
          <ToggleGroupItem
            value="d"
            aria-label="Day"
            className=" px-3 py-1 text-xs cursor-pointer data-[state=on]:bg-[#24242F] data-[state=on]:text-white text-neutral-200 hover:bg-neutral-900 transition-all  hover:text-gray-200"
          >
            D
          </ToggleGroupItem>
          <ToggleGroupItem
            value="m"
            aria-label="Month"
            className=" px-3 py-1 text-xs cursor-pointer data-[state=on]:bg-[#24242F] data-[state=on]:text-white text-neutral-200 hover:bg-neutral-900 transition-all hover:text-gray-200"
          >
            M
          </ToggleGroupItem>
          <ToggleGroupItem
            value="y"
            aria-label="Year"
            className=" px-3 py-1 text-xs cursor-pointer data-[state=on]:bg-[#24242F] data-[state=on]:text-white text-neutral-200 hover:bg-neutral-900 transition-all hover:text-gray-200"
          >
            Y
          </ToggleGroupItem>
          <ToggleGroupItem
            value="all"
            aria-label="All"
            className=" px-3 py-1 text-xs cursor-pointer data-[state=on]:bg-[#24242F] data-[state=on]:text-white text-neutral-200 hover:bg-neutral-900 transition-all hover:text-gray-200"
          >
            All
          </ToggleGroupItem>
          <ToggleGroupItem
            value="custom"
            aria-label="Custom"
            className=" px-5 py-1  text-xs cursor-pointer data-[state=on]:bg-[#24242F] data-[state=on]:text-white text-neutral-200 hover:bg-neutral-900 transition-all hover:text-gray-200"
          >
            Custom
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full border-3 border-neutral-900 rounded-2xl"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundImage: `
              radial-gradient(
                250px circle at ${mousePosition.x}px ${mousePosition.y}px,
                rgb(255, 125, 1, ${isHovering ? 0.3 : 0}),
                transparent 80%
              ),
              radial-gradient(
                circle at 1px 1px,
                #343435 1px,
                transparent 0
              )
            `,
            backgroundSize: "auto, 1rem 1rem",
            transition: "background 0.2s ease-out",
          }}
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient
                id="fillNew"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
              <linearGradient
                id="fillRemediated"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              ></linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              hide={true}
              tickFormatter={(value) => {
                const date = new Date(value);
                if (timeRange === "d") {
                  return date.toLocaleDateString("en-US", { weekday: "short" });
                }
                return date.toLocaleDateString("en-US", { month: "short" });
              }}
              className="fill-neutral-500 text-xs"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                  className="bg-neutral-800/10 p-3 backdrop-blur-xs border-neutral-700 text-white"
                />
              }
            />

            <Area
              dataKey="new"
              type="natural"
              fill="url(#fillNew)"
              stroke="var(--color-new)"
              stackId="a"
            />
            <Area
              dataKey="remediated"
              type="natural"
              fill="url(#fillRemediated)"
              stroke="var(--color-remediated)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
