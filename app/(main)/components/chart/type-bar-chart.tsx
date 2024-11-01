"use client";

import {
	Bar,
	CartesianGrid,
	BarChart as RechartsBarChart,
	XAxis,
} from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartContainer } from "@/components/chart";

import { ChartTooltip, ChartTooltipContent } from "@/components/chart";

export function BarChart() {
	const chartData = useChartStore((state) => state.chartData);
	const chartConfig = useChartStore((state) => state.chartConfig);
	return (
		<ChartContainer config={chartConfig}>
			<RechartsBarChart data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>

				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
				<Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
			</RechartsBarChart>
		</ChartContainer>
	);
}
