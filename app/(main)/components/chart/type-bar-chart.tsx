"use client";

import {
	Bar,
	CartesianGrid,
	BarChart as RechartsBarChart,
	XAxis,
} from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartContainer } from "@/components/chart";

import {
	ChartTooltipContent,
	ChartTooltip as RechartsChartTooltip,
} from "@/components/chart";
import { useRef } from "react";
export function BarChart() {
	const chartData = useChartStore((state) => state.chartData);
	const chartConfig = useChartStore((state) => state.chartConfig);
	const tooltipCoordinates = useChartStore((state) => state.tooltipCoordinates);
	const setTooltipCoordinates = useChartStore(
		(state) => state.setTooltipCoordinates,
	);

	const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		setTooltipCoordinates({ x, y });
	};

	return (
		<ChartContainer config={chartConfig} onClick={onClick}>
			<RechartsBarChart data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<RechartsChartTooltip
					cursor={false}
					active={tooltipCoordinates == null ? undefined : true}
					position={tooltipCoordinates ?? undefined}
					content={<ChartTooltipContent indicator="line" />}
				/>

				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
			</RechartsBarChart>
		</ChartContainer>
	);
}
