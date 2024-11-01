"use client";

import { useChartStore } from "@/app/(main)/chart.store";

import { LineChart } from "@/app/(main)/components/chart/type-line-chart";
import { AreaChart } from "./type-area-chart";
import { BarChart } from "./type-bar-chart";
import { PieChart } from "./type-pie-chart";

export function Chart() {
	const chartType = useChartStore((state) => state.chartType);

	if (chartType === "area") {
		return <AreaChart />;
	}
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
