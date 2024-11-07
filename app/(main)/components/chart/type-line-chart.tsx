"use client";

import {
	CartesianGrid,
	LabelList,
	Line,
	LineChart as RechartsLineChart,
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

export function LineChart() {
	const chartConfig = useChartStore((state) => state.chartConfig);

	const showGrid = useChartStore((state) => state.showGrid);
	const lineChartType = useChartStore((state) => state.lineChartType);
	const showLegend = useChartStore((state) => state.showLegend);
	const showDots = useChartStore((state) => state.showDots);
	const showLabel = useChartStore((state) => state.showLabel);
	const showXAxisLabel = useChartStore((state) => state.showXAxisLabel);
	const showYAxisLabel = useChartStore((state) => state.showYAxisLabel);
	const customMaxY = useChartStore((state) => state.customMaxY);
	const customMinY = useChartStore((state) => state.customMinY);

	const chartData = useChartStore((state) => state.chartData);
	const chartDataPath = useChartStore((state) => state.chartDataPath);
	const colors = useChartStore((state) => state.colors);

	const values = buildRechartsValues(chartDataPath, chartData);

	return (
		<ChartContainer config={chartConfig}>
			{/* @ts-expect-error - Recharts doesn't have overflow prop, but it works */}
			<RechartsLineChart data={values} overflow="visible">
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
						domain={[customMinY ?? "dataMin - 5", customMaxY ?? "dataMax + 5"]}
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
						<Line
							key={column.uuid}
							dataKey={column.uuid}
							type={lineChartType}
							stroke={colors[index - 1].hex}
							fill={colors[index - 1].hex}
							fillOpacity={0.1}
							radius={4}
							dot={showDots}
						>
							{showLabel && (
								<LabelList
									position="top"
									offset={12}
									className="fill-foreground"
									fontSize={12}
								/>
							)}
						</Line>
					);
				})}
			</RechartsLineChart>
		</ChartContainer>
	);
}
