"use client";

import {
	CartesianGrid,
	LabelList,
	Line,
	LineChart as RechartsLineChart,
	XAxis,
} from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/components/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/chart";

export function LineChart() {
	const chartData = useChartStore((state) => state.chartData);
	const chartConfig = useChartStore((state) => state.chartConfig);

	const showGrid = useChartStore((state) => state.showGrid);
	const lineChartType = useChartStore((state) => state.lineChartType);
	const showLegend = useChartStore((state) => state.showLegend);
	const showDots = useChartStore((state) => state.showDots);

	return (
		<ChartContainer config={chartConfig}>
			<RechartsLineChart data={chartData}>
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

				<Line
					dataKey="desktop"
					type={lineChartType}
					stroke="var(--color-desktop)"
					fill="var(--color-desktop)"
					fillOpacity={0.1}
					radius={4}
					dot={showDots}
				/>
				<Line
					dataKey="mobile"
					type={lineChartType}
					stroke="var(--color-mobile)"
					fill="var(--color-mobile)"
					fillOpacity={0.1}
					radius={4}
					dot={showDots}
				/>
				<LabelList
					position="top"
					offset={12}
					className="fill-foreground"
					fontSize={12}
				/>
			</RechartsLineChart>
		</ChartContainer>
	);
}
