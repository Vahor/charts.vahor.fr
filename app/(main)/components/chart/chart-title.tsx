"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export const ChartTitle: React.FC<{ className?: string }> = ({ className }) => {
	const chartTitle = useChartStore((state) => state.chartTitle);
	const setChartTitle = useChartStore((state) => state.setChartTitle);

	return (
		<Input
			value={chartTitle}
			onChange={(e) => setChartTitle(e.target.value)}
			placeholder="Click to edit title"
			data-ignore-in-export={chartTitle.length === 0}
			className={cn(
				"h-4 rounded-sm border-none p-0 font-semibold text-md leading-none tracking-tight",
				className,
			)}
		/>
	);
};
