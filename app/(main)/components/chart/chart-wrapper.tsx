"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartHeader } from "@/app/(main)/components/chart/chart-header";
import { Card, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

export const ChartWrapper: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const lightMode = useChartStore((state) => state.lightMode);
	const scale = useChartStore((state) => state.scale);

	return (
		<div className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/3 w-full max-w-screen-sm xl:max-w-screen-md">
			<div
				id="chart-wrapper"
				className={cn(
					lightMode && "light",
					"transition-transform duration-75 will-change-transform",
				)}
				style={{ transform: `scale(${scale})` }}
			>
				<Card>
					<ChartHeader />
					<CardContent>{children}</CardContent>
				</Card>
			</div>
		</div>
	);
};
