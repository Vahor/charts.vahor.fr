"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowLegendSwitch: React.FC = () => {
	const showLegend = useChartStore((state) => state.showLegend);
	const setShowLegend = useChartStore((state) => state.setShowLegend);

	return (
		<NavigationItem title="Show legend" id="show-legend">
			<Switch
				checked={showLegend}
				onCheckedChange={setShowLegend}
				id="show-legend"
				aria-labelledby="show-legend-label"
			/>
		</NavigationItem>
	);
};
