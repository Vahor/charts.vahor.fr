"use client";

import type { ChartConfig } from "@/components/chart";
import { buildSafeEvalFunction } from "@/lib/safe-eval";
import { randomUUID } from "@/lib/uuid";
import { toast } from "sonner";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type LineChartType = "step" | "natural" | "linear";
export type ChartType = "area" | "line" | "bar" | "pie";
export type ChartData = Record<string, number | string>[];
export type ChartDataPath = Array<{
	uuid: string;
	evalPath: string;
	evalPathFunction: (data: ChartData[number]) => string | number | undefined;
	name: string;
}>;

export type ChartStore = {
	chartType: ChartType;
	setChartType: (chartType: ChartStore["chartType"]) => void;

	lightMode: boolean;
	setLightMode: (lightMode: ChartStore["lightMode"]) => void;

	scale: number;
	setScale: (scale: ChartStore["scale"]) => void;

	chartData: ChartData;
	setChartData: (chartData: ChartStore["chartData"]) => void;

	chartDataPathError: string | undefined;

	chartDataPath: ChartDataPath;
	setChartDataPath: (chartDataPath: ChartDataPath) => void;
	updateChartDataPathName: (index: number, name: string) => void;
	updateChartDataPathEvalPath: (index: number, evalPath: string) => void;

	lineChartType: LineChartType;
	setLineChartType: (lineChartType: ChartStore["lineChartType"]) => void;

	showDots: boolean;
	setShowDots: (showDots: ChartStore["showDots"]) => void;

	chartConfig: ChartConfig;
	setChartConfig: (chartConfig: ChartStore["chartConfig"]) => void;

	showLegend: boolean;
	setShowLegend: (showLegend: ChartStore["showLegend"]) => void;

	chartTitle: string;
	setChartTitle: (chartTitle: ChartStore["chartTitle"]) => void;
	chartDescription: string;
	setChartDescription: (
		chartDescription: ChartStore["chartDescription"],
	) => void;

	showHeader: boolean;
	setShowHeader: (showHeader: ChartStore["showHeader"]) => void;
	showFooter: boolean;
	setShowFooter: (showFooter: ChartStore["showFooter"]) => void;

	/** Also used for pie chart to show text inside chart */
	showGrid: boolean;
	setShowGrid: (showGrid: ChartStore["showGrid"]) => void;

	focusStatsTitle: string;
	setFocusStatsTitle: (focusStatTitle: ChartStore["focusStatsTitle"]) => void;
	focusStatsValue: string;
	setFocusStatsValue: (focusStatValue: ChartStore["focusStatsValue"]) => void;

	// TODO: focus point for tooltip (user can click on chart to focus point)
};

export const useChartStore = create<ChartStore>()(
	devtools(
		persist(
			(set, get) => ({
				chartType: "line",
				setChartType: (chartType) => set({ chartType }),

				scale: 1,
				setScale: (scale) => set({ scale }),

				lightMode: false,
				setLightMode: (lightMode) => set({ lightMode }),

				chartData: [
					{ month: "January", desktop: 186, mobile: 80 },
					{ month: "February", desktop: 305, mobile: 200 },
					{ month: "March", desktop: 237, mobile: 120 },
					{ month: "April", desktop: 73, mobile: 190 },
					{ month: "May", desktop: 209, mobile: 130 },
					{ month: "June", desktop: 214, mobile: 140 },
				],
				setChartData: (chartData) => set({ chartData }),

				chartDataPath: [
					{
						uuid: randomUUID(),
						evalPath: "data.month.slice(0, 3).toUpperCase()",
						evalPathFunction: buildSafeEvalFunction(
							"data.month.slice(0, 3).toUpperCase()",
						),
						name: "Month",
					},
					{
						uuid: randomUUID(),
						evalPath: "data.desktop",
						evalPathFunction: (data) => data.desktop,
						name: "Desktop",
					},
					{
						uuid: randomUUID(),
						evalPath: "data.mobile",
						evalPathFunction: (data) => data.mobile,
						name: "Mobile",
					},
				],

				chartDataPathError: undefined,
				setChartDataPath: (chartDataPath) => {
					if (chartDataPath.length === 0) {
						toast.error("You can't remove the last column");
						return;
					}
					const chartData = get().chartData;
					const columnEvalPath = chartDataPath[0].evalPathFunction;
					const error = checkErrors(chartData, columnEvalPath, chartDataPath);

					return set({ chartDataPath, chartDataPathError: error });
				},
				updateChartDataPathName: (index, name) =>
					set({
						chartDataPath: get().chartDataPath.map((column, i) =>
							i === index ? { ...column, name } : column,
						),
					}),
				updateChartDataPathEvalPath: (index, evalPath) => {
					const evalPathFunction = buildSafeEvalFunction(evalPath);
					if (index === 0) {
						const chartData = get().chartData;
						const error = checkErrors(
							chartData,
							evalPathFunction,
							get().chartDataPath,
						);
						set({ chartDataPathError: error });
					}
					return set({
						chartDataPath: get().chartDataPath.map((column, i) =>
							i === index
								? {
										...column,
										evalPath,
										evalPathFunction,
									}
								: column,
						),
					});
				},

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

				lineChartType: "natural",
				setLineChartType: (lineChartType) => set({ lineChartType }),

				showDots: true,
				setShowDots: (showDots) => set({ showDots }),

				showGrid: true,
				setShowGrid: (showGrid) => set({ showGrid }),

				showLegend: true,
				setShowLegend: (showLegend) => set({ showLegend }),

				showHeader: true,
				setShowHeader: (showHeader) => set({ showHeader }),

				showFooter: true,
				setShowFooter: (showFooter) => set({ showFooter }),

				chartTitle: "",
				setChartTitle: (chartTitle) => set({ chartTitle: chartTitle }),
				chartDescription: "",
				setChartDescription: (chartDescription) =>
					set({ chartDescription: chartDescription }),

				focusStatsTitle: "",
				setFocusStatsTitle: (focusStatTitle) =>
					set({ focusStatsTitle: focusStatTitle }),
				focusStatsValue: "",
				setFocusStatsValue: (focusStatValue) =>
					set({ focusStatsValue: focusStatValue }),
			}),
			{
				name: "chart-store",
				partialize: (state) => ({
					chartType: state.chartType,
					showLegend: state.showLegend,
					lineChartType: state.lineChartType,
					showDots: state.showDots,
					showHeader: state.showHeader,
					showFooter: state.showFooter,
					scale: state.scale,
					showGrid: state.showGrid,
					chartTitle: state.chartTitle,
					chartDescription: state.chartDescription,
					focusStatsTitle: state.focusStatsTitle,
					focusStatsValue: state.focusStatsValue,
					lightMode: state.lightMode,
				}),
			},
		),
	),
);

const checkErrors = (
	chartData: ChartData,
	evalPathFunction: (data: ChartData[number]) => unknown,
	chartDataPath: ChartStore["chartDataPath"],
) => {
	const uniqueValues = new Set(chartData.map(evalPathFunction));
	if (uniqueValues.size !== chartData.length) {
		return `Columns must have unique values, found multiples rows with ${[...uniqueValues].join(", ")}`;
	}
	if (chartDataPath.length < 2) {
		return "At least 2 columns are required";
	}
	return undefined;
};
