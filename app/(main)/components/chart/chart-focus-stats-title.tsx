"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export const ChartFocusStatsTitle: React.FC<{ className?: string }> = ({
	className,
}) => {
	const chartFocusStatsTitle = useChartStore((state) => state.focusStatsTitle);
	const setChartFocusStatsTitle = useChartStore(
		(state) => state.setFocusStatsTitle,
	);

	return (
		<Input
			value={chartFocusStatsTitle}
			onChange={(e) => setChartFocusStatsTitle(e.target.value)}
			placeholder="Title"
			data-ignore-in-export={chartFocusStatsTitle.length === 0}
			className={cn(
				"h-4 rounded-sm border-none p-0 font-semibold text-md leading-none tracking-tight",
				className,
			)}
		/>
	);
};
