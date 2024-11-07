"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";

export const CustomMaxYInput = () => {
	const customMaxY = useChartStore((state) => state.customMaxY);
	const setCustomMaxY = useChartStore((state) => state.setCustomMaxY);

	return (
		<NavigationItem title="Custom Max Y" id="custom-max-y">
			<Input
				id="custom-max-y"
				type="number"
				disabled={customMaxY === undefined}
				value={customMaxY ?? 0}
				onChange={(e) => setCustomMaxY(Number(e.target.value))}
			/>
			<Switch
				checked={customMaxY !== undefined}
				onCheckedChange={(e) => setCustomMaxY(e ? 0 : undefined)}
			/>
		</NavigationItem>
	);
};
