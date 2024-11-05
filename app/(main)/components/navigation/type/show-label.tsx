"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowLabelSwitch: React.FC = () => {
	const showLabel = useChartStore((state) => state.showLabel);
	const setShowLabel = useChartStore((state) => state.setShowLabel);

	return (
		<NavigationItem title="Show label" id="show-label">
			<Switch
				checked={showLabel}
				onCheckedChange={setShowLabel}
				id="show-label"
			/>
		</NavigationItem>
	);
};
