"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const YAxisLabelSwitch: React.FC = () => {
	const showYAxisLabel = useChartStore((state) => state.showYAxisLabel);
	const setShowYAxisLabel = useChartStore((state) => state.setShowYAxisLabel);

	return (
		<NavigationItem title="Show y axis label" id="show-y-axis-label">
			<Switch
				checked={showYAxisLabel}
				onCheckedChange={setShowYAxisLabel}
				id="show-y-axis-label"
			/>
		</NavigationItem>
	);
};
