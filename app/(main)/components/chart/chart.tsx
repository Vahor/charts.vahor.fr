"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LineChart = dynamic(() =>
	import("./type-line-chart").then((mod) => mod.LineChart),
);
const BarChart = dynamic(() =>
	import("./type-bar-chart").then((mod) => mod.BarChart),
);
const PieChart = dynamic(() =>
	import("./type-pie-chart").then((mod) => mod.PieChart),
);

export function Chart() {
	const chartType = useChartStore((state) => state.chartType);

	const Chart = (() => {
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
	})();

	return <Suspense fallback={<div>Loading...</div>}>{Chart}</Suspense>;
}
