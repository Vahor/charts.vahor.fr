"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export const ChartFocusStatsValue: React.FC<{ className?: string }> = ({
	className,
}) => {
	const chartFocusStatsValue = useChartStore((state) => state.focusStatsValue);
	const setChartFocusStatsValue = useChartStore(
		(state) => state.setFocusStatsValue,
	);

	return (
		<Input
			value={chartFocusStatsValue}
			onChange={(e) => setChartFocusStatsValue(e.target.value)}
			placeholder="###"
			data-ignore-in-export={chartFocusStatsValue.length === 0}
			className={cn(
				"h-4 rounded-sm border-none p-0 text-muted-foreground text-sm",
				className,
			)}
		/>
	);
};
