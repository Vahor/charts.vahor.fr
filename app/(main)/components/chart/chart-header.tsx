"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartDescription } from "@/app/(main)/components/chart/chart-description";
import { ChartFocusStats } from "@/app/(main)/components/chart/chart-focus-stats";
import { ChartTitle } from "@/app/(main)/components/chart/chart-title";
import { CardHeader } from "@/components/card";

export const ChartHeader: React.FC = () => {
	const showHeader = useChartStore((state) => state.showHeader);
	if (!showHeader) {
		return <div className="p-4" />;
	}

	return (
		<CardHeader className="py-0">
			<div className="flex flex-row justify-between gap-2 border-b py-0">
				<div className="flex flex-1 shrink-0 flex-col py-6">
					<ChartTitle />
					<ChartDescription />
				</div>
				<ChartFocusStats />
			</div>
		</CardHeader>
	);
};
