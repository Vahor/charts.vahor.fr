"use client";

import {
	Bar,
	CartesianGrid,
	BarChart as RechartsBarChart,
	Rectangle,
	XAxis,
} from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/components/chart";

import { ChartTooltip, ChartTooltipContent } from "@/components/chart";

export function BarChart() {
	const chartData = useChartStore((state) => state.chartData);
	const chartConfig = useChartStore((state) => state.chartConfig);

	const showGrid = useChartStore((state) => state.showGrid);
	const showLegend = useChartStore((state) => state.showLegend);

	return (
		<ChartContainer config={chartConfig}>
			<RechartsBarChart data={chartData}>
				{showGrid && <CartesianGrid vertical={false} />}
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
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}

				<Bar
					dataKey="desktop"
					fill="var(--color-desktop)"
					radius={4}
					strokeWidth={2}
				/>
				<Bar
					dataKey="mobile"
					fill="var(--color-mobile)"
					radius={4}
					activeBar={({ ...props }) => {
						return (
							<Rectangle
								{...props}
								fillOpacity={0.8}
								stroke={props.payload.fill}
								strokeDasharray={4}
								strokeDashoffset={4}
							/>
						);
					}}
				/>
			</RechartsBarChart>
		</ChartContainer>
	);
}
