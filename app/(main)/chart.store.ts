"use client";

import type { ChartConfig } from "@/components/chart";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type ChartType = "line" | "bar" | "pie";

export type ChartStore = {
	chartType: ChartType;
	setChartType: (chartType: ChartStore["chartType"]) => void;

	chartData: Record<string, number | string>[];
	setChartData: (chartData: ChartStore["chartData"]) => void;

	chartConfig: ChartConfig;
	setChartConfig: (chartConfig: ChartStore["chartConfig"]) => void;

	grid: boolean;
	showGrid: (grid: boolean) => void;

	legend: boolean;
	showLegend: (legend: boolean) => void;

	// TODO: focus point for tooltip (user can click on chart to focus point)
};

export const useChartStore = create<ChartStore>()(
	devtools(
		persist(
			(set) => ({
				chartType: "line",
				setChartType: (chartType) => set({ chartType }),

				chartData: [
					{ month: "January", desktop: 186, mobile: 80 },
					{ month: "February", desktop: 305, mobile: 200 },
					{ month: "March", desktop: 237, mobile: 120 },
					{ month: "April", desktop: 73, mobile: 190 },
					{ month: "May", desktop: 209, mobile: 130 },
					{ month: "June", desktop: 214, mobile: 140 },
				],
				setChartData: (chartData) => set({ chartData }),

				chartConfig: {
					desktop: {
						label: "Desktop",
						color: "#2563eb",
					},
					mobile: {
						label: "Mobile",
						color: "#60a5fa",
					},
				},
				setChartConfig: (chartConfig) => set({ chartConfig }),

				grid: true,
				showGrid: (grid) => set({ grid }),

				legend: true,
				showLegend: (legend) => set({ legend }),
			}),
			{
				name: "chart-store",
				partialize: (state) => ({
					chartType: state.chartType,
					legend: state.legend,
					grid: state.grid,
				}),
			},
		),
	),
);
