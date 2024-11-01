"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartHeader } from "@/app/(main)/components/chart/chart-header";
import { Card, CardContent } from "@/components/card";
import { cn } from "@/lib/utils";

export const ChartWrapper: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const lightMode = useChartStore((state) => state.lightMode);

	return (
		<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 w-full max-w-screen-md pb-32 xl:max-w-screen-lg ">
			<div id="chart-wrapper" className={cn("p-8", lightMode && "light")}>
				<Card>
					<ChartHeader />
					<CardContent>{children}</CardContent>
				</Card>
			</div>
		</div>
	);
};
