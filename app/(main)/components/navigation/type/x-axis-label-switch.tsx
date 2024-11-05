"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const XAxisLabelSwitch: React.FC = () => {
	const showXAxisLabel = useChartStore((state) => state.showXAxisLabel);
	const setShowXAxisLabel = useChartStore((state) => state.setShowXAxisLabel);

	return (
		<NavigationItem title="Show x axis label" id="show-x-axis-label">
			<Switch
				checked={showXAxisLabel}
				onCheckedChange={setShowXAxisLabel}
				id="show-x-axis-label"
			/>
		</NavigationItem>
	);
};
