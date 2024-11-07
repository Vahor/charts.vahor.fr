"use client";

import {
	Bar,
	CartesianGrid,
	LabelList,
	BarChart as RechartsBarChart,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";

import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/components/chart";

import { ChartTooltip, ChartTooltipContent } from "@/components/chart";
import { buildRechartsValues } from "@/lib/build-values";

export function BarChart() {
	const chartConfig = useChartStore((state) => state.chartConfig);

	const showGrid = useChartStore((state) => state.showGrid);
	const showLegend = useChartStore((state) => state.showLegend);
	const showLabel = useChartStore((state) => state.showLabel);
	const showXAxisLabel = useChartStore((state) => state.showXAxisLabel);
	const showYAxisLabel = useChartStore((state) => state.showYAxisLabel);

	const chartData = useChartStore((state) => state.chartData);
	const chartDataPath = useChartStore((state) => state.chartDataPath);
	const colors = useChartStore((state) => state.colors);

	const values = buildRechartsValues(chartDataPath, chartData);

	return (
		<ChartContainer config={chartConfig}>
			{/* @ts-expect-error - Recharts doesn't have overflow prop, but it works */}
			<RechartsBarChart data={values} overflow="visible">
				{showGrid && <CartesianGrid vertical={false} />}
				{showXAxisLabel && (
					<XAxis
						dataKey={chartDataPath[0].uuid}
						tickLine={false}
						axisLine={false}
						tickMargin={8}
					/>
				)}
				{showYAxisLabel && (
					<YAxis
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						domain={["dataMin - 5", "dataMax + 5"]}
						allowDataOverflow={true}
					/>
				)}

				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}

				{chartDataPath.map((column, index) => {
					if (index === 0) return null;
					return (
						<Bar
							key={column.uuid}
							dataKey={column.uuid}
							fill={colors[index - 1].hex}
							radius={4}
							strokeWidth={2}
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
						>
							{showLabel && (
								<LabelList
									position="top"
									offset={12}
									className="fill-foreground"
									fontSize={12}
								/>
							)}
						</Bar>
					);
				})}
			</RechartsBarChart>
		</ChartContainer>
	);
}
