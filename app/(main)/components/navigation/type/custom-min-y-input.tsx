"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";

export const CustomMinYInput = () => {
	const customMinY = useChartStore((state) => state.customMinY);
	const setCustomMinY = useChartStore((state) => state.setCustomMinY);

	return (
		<NavigationItem title="Custom Min Y" id="custom-min-y">
			<Input
				id="custom-min-y"
				type="number"
				disabled={customMinY === undefined}
				value={customMinY ?? 0}
				onChange={(e) => setCustomMinY(Number(e.target.value))}
			/>
			<Switch
				checked={customMinY !== undefined}
				onCheckedChange={(e) => setCustomMinY(e ? 0 : undefined)}
			/>
		</NavigationItem>
	);
};
