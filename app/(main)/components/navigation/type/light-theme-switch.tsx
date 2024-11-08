"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Switch } from "@/components/switch";

export const LightThemeSwitch: React.FC = () => {
	const lightMode = useChartStore((state) => state.lightMode);
	const setLightMode = useChartStore((state) => state.setLightMode);

	return (
		<NavigationItem title="Light mode" id="theme-switch">
			<Switch
				checked={lightMode}
				onCheckedChange={setLightMode}
				id="theme-switch"
				aria-labelledby="theme-switch-label"
			/>
		</NavigationItem>
	);
};
