"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { LineChartCurveType } from "@/app/(main)/components/navigation/line-chart-curve-type";
import { ShowDotsSwitch } from "@/app/(main)/components/navigation/show-dots-switch";
import { ShowGridSwitch } from "@/app/(main)/components/navigation/show-grid-switch";
import { ShowLegendSwitch } from "@/app/(main)/components/navigation/show-legend-switch";
import { Card } from "@/components/card";

export const SubNavigation: React.FC = () => {
	const chartType = useChartStore((state) => state.chartType);

	return (
		<div className="-translate-y-full -translate-x-1/2 -z-40 absolute left-1/2 mx-auto mt-2 w-full max-w-screen-sm px-8">
			<Card>
				<div className="flex flex-row items-center justify-center gap-6 p-4">
					<ShowGridSwitch />
					<ShowLegendSwitch />
					{(chartType === "line" || chartType === "area") && <ShowDotsSwitch />}
					{chartType === "line" && <LineChartCurveType />}
				</div>
			</Card>
		</div>
	);
};
