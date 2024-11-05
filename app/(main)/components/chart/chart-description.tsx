"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export const ChartDescription: React.FC<{ className?: string }> = ({
	className,
}) => {
	const chartDescription = useChartStore((state) => state.chartDescription);
	const setChartDescription = useChartStore(
		(state) => state.setChartDescription,
	);

	return (
		<Input
			value={chartDescription}
			onChange={(e) => setChartDescription(e.target.value)}
			placeholder="Click to edit description"
			data-ignore-in-export={chartDescription.length === 0}
			className={cn(
				"h-4 rounded-sm border-none p-0 text-muted-foreground text-sm",
				className,
			)}
		/>
	);
};
