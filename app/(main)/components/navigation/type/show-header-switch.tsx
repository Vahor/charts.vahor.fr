"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowHeaderSwitch: React.FC = () => {
	const showHeader = useChartStore((state) => state.showHeader);
	const setShowHeader = useChartStore((state) => state.setShowHeader);

	return (
		<NavigationItem title="Show header" id="show-header">
			<Switch
				checked={showHeader}
				onCheckedChange={setShowHeader}
				id="show-header"
				aria-labelledby="show-header-label"
			/>
		</NavigationItem>
	);
};
