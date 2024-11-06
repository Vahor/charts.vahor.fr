"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const ShowFooterSwitch: React.FC = () => {
	const showFooter = useChartStore((state) => state.showFooter);
	const setShowFooter = useChartStore((state) => state.setShowFooter);

	return (
		<NavigationItem title="Show footer" id="show-footer">
			<Switch
				checked={showFooter}
				onCheckedChange={setShowFooter}
				id="show-footer"
				aria-labelledby="show-footer-label"
			/>
		</NavigationItem>
	);
};
