"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowGridSwitch: React.FC = () => {
	const showGrid = useChartStore((state) => state.showGrid);
	const setShowGrid = useChartStore((state) => state.setShowGrid);

	const chartType = useChartStore((state) => state.chartType);

	return (
		<NavigationItem title={chartType === "pie" ? "Donut" : "Show grid"}>
			<Switch checked={showGrid} onCheckedChange={setShowGrid} />
		</NavigationItem>
	);
};
