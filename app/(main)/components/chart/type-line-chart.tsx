"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartContainer } from "@/components/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/chart";

export function LineChart() {
	const chartData = useChartStore((state) => state.chartData);
	const chartConfig = useChartStore((state) => state.chartConfig);

	return (
		<ChartContainer config={chartConfig}>
			<AreaChart data={chartData}>
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

				<Area
					dataKey="desktop"
					stroke="var(--color-desktop)"
					fill="var(--color-desktop)"
					fillOpacity={0.1}
					radius={4}
				/>
				<Area
					dataKey="mobile"
					stroke="var(--color-mobile)"
					fill="var(--color-mobile)"
					fillOpacity={0.1}
					radius={4}
				/>
			</AreaChart>
		</ChartContainer>
	);
}
