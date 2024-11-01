"use client";

import { useChartStore } from "@/app/(main)/chart.store";

import { BarChart } from "./type-bar-chart";
import { LineChart } from "./type-line-chart";
import { PieChart } from "./type-pie-chart";

export function Chart() {
	const chartType = useChartStore((state) => state.chartType);

	if (chartType === "line") {
		return <LineChart />;
	}
	if (chartType === "bar") {
		return <BarChart />;
	}
	if (chartType === "pie") {
		return <PieChart />;
	}
	return null;
}
