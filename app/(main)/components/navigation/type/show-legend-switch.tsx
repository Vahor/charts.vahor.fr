"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowLegendSwitch: React.FC = () => {
	const showLegend = useChartStore((state) => state.showLegend);
	const setShowLegend = useChartStore((state) => state.setShowLegend);

	return (
		<NavigationItem title="Show legend">
			<Switch checked={showLegend} onCheckedChange={setShowLegend} />
		</NavigationItem>
	);
};
