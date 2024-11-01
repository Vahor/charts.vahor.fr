"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { Input } from "@/components/input";

export const ChartFocusStats = () => {
	const chartType = useChartStore((state) => state.chartType);
	const focusStatsTitle = useChartStore((state) => state.focusStatsTitle);
	const focusStatsValue = useChartStore((state) => state.focusStatsValue);
	const setFocusStatsTitle = useChartStore((state) => state.setFocusStatsTitle);
	const setFocusStatsValue = useChartStore((state) => state.setFocusStatsValue);

	if (chartType === "pie") {
		// donut chart has stats in the center
		return null;
	}

	return (
		<div
			className="flex w-48 flex-col justify-center gap-1 border-l pl-6 text-left"
			data-ignore-in-export={
				focusStatsTitle.length === 0 && focusStatsValue.length === 0
			}
		>
			<Input
				value={focusStatsTitle}
				onChange={(e) => setFocusStatsTitle(e.target.value)}
				placeholder="Some title"
				data-ignore-in-export={focusStatsTitle.length === 0}
				className="h-4 rounded-sm border-none p-0 text-muted-foreground text-sm"
			/>

			<Input
				value={focusStatsValue}
				onChange={(e) => setFocusStatsValue(e.target.value)}
				placeholder="###"
				data-ignore-in-export={focusStatsValue.length === 0}
				className="h-8 rounded-sm border-none p-0 font-bold text-lg leading-none sm:text-3xl"
			/>
		</div>
	);
};
