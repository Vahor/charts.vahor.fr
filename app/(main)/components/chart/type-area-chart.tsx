"use client";

import {
	Area,
	CartesianGrid,
	LabelList,
	AreaChart as RechartsAreaChart,
	XAxis,
} from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/components/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { buildRechartsValues } from "@/lib/build-values";

export function AreaChart() {
	const chartConfig = useChartStore((state) => state.chartConfig);

	const showGrid = useChartStore((state) => state.showGrid);
	const lineChartType = useChartStore((state) => state.lineChartType);
	const showLegend = useChartStore((state) => state.showLegend);
	const showDots = useChartStore((state) => state.showDots);

	const chartData = useChartStore((state) => state.chartData);
	const chartDataPath = useChartStore((state) => state.chartDataPath);

	const values = buildRechartsValues(chartDataPath, chartData);

	return (
		<ChartContainer config={chartConfig}>
			<RechartsAreaChart data={values}>
				{showGrid && <CartesianGrid vertical={false} />}
				<XAxis
					dataKey={chartDataPath[0].uuid}
					tickLine={false}
					axisLine={false}
					tickMargin={8}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}

				{chartDataPath.map((column, index) => {
					if (index === 0) return null;
					return (
						<Area
							key={column.uuid}
							dataKey={column.uuid}
							type={lineChartType}
							stroke={`var(--color-${column.uuid})`}
							fill={`var(--color-${column.uuid})`}
							fillOpacity={0.1}
							radius={4}
							dot={showDots}
						/>
					);
				})}
				<LabelList
					position="top"
					offset={12}
					className="fill-foreground"
					fontSize={12}
				/>
			</RechartsAreaChart>
		</ChartContainer>
	);
}
