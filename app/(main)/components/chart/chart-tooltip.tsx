import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartTooltipContent,
	ChartTooltip as RechartsChartTooltip,
} from "@/components/chart";
import type { ComponentProps } from "react";

export const ChartTooltip: React.FC<
	ComponentProps<typeof RechartsChartTooltip>
> = (props) => {
	const tooltipCoordinates = useChartStore((state) => state.tooltipCoordinates);
	const setTooltipCoordinates = useChartStore(
		(state) => state.setTooltipCoordinates,
	);
	return (
		<RechartsChartTooltip
			cursor={false}
			{...props}
			active
			position={tooltipCoordinates ?? undefined}
			content={<ChartTooltipContent indicator="line" />}
		/>
	);
};
