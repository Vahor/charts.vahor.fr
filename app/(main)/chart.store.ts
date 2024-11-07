"use client";

import type { ChartConfig } from "@/components/chart";
import { randomUUID } from "@/lib/random";
import { buildSafeEvalFunction, noop } from "@/lib/safe-eval";
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
export type Color = { hex: string; uuid: string };

export type ChartStore = {
	chartType: ChartType;
	setChartType: (chartType: ChartStore["chartType"]) => void;

	// TODO: add more themes
	lightMode: boolean;
	setLightMode: (lightMode: ChartStore["lightMode"]) => void;

	scale: number;
	setScale: (scale: ChartStore["scale"]) => void;

	chartData: ChartData;
	setChartData: (chartData: ChartStore["chartData"]) => void;

	chartDataPathError: string | undefined;

	chartDataPath: ChartDataPath;
	setChartDataPath: (chartDataPath: ChartDataPath) => void;
	addNewChartDataPath: () => void;
	updateChartDataPathName: (index: number, name: string) => void;
	updateChartDataPathEvalPath: (index: number, evalPath: string) => void;

	lineChartType: LineChartType;
	setLineChartType: (lineChartType: ChartStore["lineChartType"]) => void;

	showDots: boolean;
	setShowDots: (showDots: ChartStore["showDots"]) => void;

	chartConfig: ChartConfig;
	setChartConfig: (chartConfig: ChartStore["chartConfig"]) => void;
	generateChartConfig: () => void;

	colors: Color[];
	setColors: (colors: ChartStore["colors"]) => void;
	updateColor: (index: number, color: string) => void;

	showLegend: boolean;
	setShowLegend: (showLegend: ChartStore["showLegend"]) => void;

	showLabel: boolean;
	setShowLabel: (showLabel: ChartStore["showLabel"]) => void;

	showXAxisLabel: boolean;
	setShowXAxisLabel: (xAxisLabel: ChartStore["showXAxisLabel"]) => void;

	showYAxisLabel: boolean;
	setShowYAxisLabel: (yAxisLabel: ChartStore["showYAxisLabel"]) => void;

	customMinY: number | undefined;
	setCustomMinY: (customMinY: ChartStore["customMinY"]) => void;

	customMaxY: number | undefined;
	setCustomMaxY: (customMaxY: ChartStore["customMaxY"]) => void;

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
};

export const useChartStore = create<ChartStore>()(
	devtools(
		persist(
			(set, get) => ({
				chartType: "line",
				setChartType: (chartType) => {
					if (get().chartDataPath.length !== 2 && chartType === "pie") {
						toast.error("Pie chart requires exactly 2 columns", {
							id: "chart-type-error",
						});
					}
					return set({ chartType });
				},

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
						uuid: "month",
						evalPath: "data.month.slice(0, 3).toUpperCase()",
						evalPathFunction: buildSafeEvalFunction(
							"data.month.slice(0, 3).toUpperCase()",
						),
						name: "Month",
					},
					{
						uuid: "desktop",
						evalPath: "data.desktop",
						evalPathFunction: (data) => data.desktop,
						name: "Desktop",
					},
					{
						uuid: "mobile",
						evalPath: "data.mobile",
						evalPathFunction: (data) => data.mobile,
						name: "Mobile",
					},
				],

				chartDataPathError: undefined,
				addNewChartDataPath: () => {
					const uuid = randomUUID();
					set((state) => ({
						chartDataPath: [
							...state.chartDataPath,
							{
								uuid,
								evalPath: "data.",
								evalPathFunction: noop,
								name: "Unknown",
							},
						],
						chartConfig: {
							...state.chartConfig,
							[uuid]: {
								label: "Unknown",
							},
						},
					}));
				},
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
				updateChartDataPathName: (index, name) => {
					const currentColumn = get().chartDataPath[index];
					// update chartConfig label
					get().chartConfig[currentColumn.uuid].label = name;

					return set({
						chartDataPath: get().chartDataPath.map((column, i) => {
							if (i === index) {
								return {
									...column,
									name,
								};
							}
							return column;
						}),
					});
				},
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

				// TODO: remove chartConfig, if it only has the label we alreay have the info in chartDataPath
				chartConfig: {
					desktop: {
						label: "Desktop",
					},
					mobile: {
						label: "Mobile",
					},
				},
				setChartConfig: (chartConfig) => set({ chartConfig }),
				generateChartConfig: () => {
					const chartConfig: ChartConfig = {};
					for (const column of get().chartDataPath) {
						chartConfig[column.uuid] = {
							label: column.name,
						};
					}

					return set({ chartConfig });
				},

				colors: [
					{ hex: "#2563eb", uuid: "blue" },
					{ hex: "#ff7f0e", uuid: "orange" },
					{ hex: "#2ca02c", uuid: "green" },
					{ hex: "#d62728", uuid: "red" },
					{ hex: "#9467bd", uuid: "purple" },
					{ hex: "#8c564b", uuid: "brown" },
					{ hex: "#e377c2", uuid: "pink" },
					{ hex: "#7f7f7f", uuid: "gray" },
					{ hex: "#bcbd22", uuid: "olive" },
					{ hex: "#17becf", uuid: "cyan" },
				],
				setColors: (colors) => set({ colors }),
				updateColor: (index, color) => {
					return set({
						colors: get().colors.map((c, i) =>
							i === index ? { hex: color, uuid: c.uuid } : c,
						),
					});
				},

				lineChartType: "natural",
				setLineChartType: (lineChartType) => set({ lineChartType }),

				showDots: true,
				setShowDots: (showDots) => set({ showDots }),

				showLabel: true,
				setShowLabel: (showLabel) => set({ showLabel }),

				showGrid: true,
				setShowGrid: (showGrid) => set({ showGrid }),

				showLegend: true,
				setShowLegend: (showLegend) => set({ showLegend }),

				showHeader: true,
				setShowHeader: (showHeader) => set({ showHeader }),

				showFooter: true,
				setShowFooter: (showFooter) => set({ showFooter }),

				showXAxisLabel: true,
				setShowXAxisLabel: (xAxisLabel) => set({ showXAxisLabel: xAxisLabel }),

				showYAxisLabel: true,
				setShowYAxisLabel: (yAxisLabel) => set({ showYAxisLabel: yAxisLabel }),

				customMinY: undefined,
				setCustomMinY: (customMinY) => set({ customMinY }),

				customMaxY: undefined,
				setCustomMaxY: (customMaxY) => set({ customMaxY }),

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
					showLabel: state.showLabel,
					showXAxisLabel: state.showXAxisLabel,
					showYAxisLabel: state.showYAxisLabel,
					colors: state.colors,
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
