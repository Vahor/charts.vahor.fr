"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowDotsSwitch: React.FC = () => {
	const showDots = useChartStore((state) => state.showDots);
	const setShowDots = useChartStore((state) => state.setShowDots);

	return (
		<NavigationItem title="Show dots" id="show-dots">
			<Switch checked={showDots} onCheckedChange={setShowDots} id="show-dots" />
		</NavigationItem>
	);
};
