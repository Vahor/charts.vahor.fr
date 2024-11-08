"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import { ChartFocusStatsTitle } from "@/app/(main)/components/chart/chart-focus-stats-title";
import { ChartFocusStatsValue } from "@/app/(main)/components/chart/chart-focus-stats-value";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/chart";
import { buildRechartsValues } from "@/lib/build-values";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LabelList, Pie, PieChart as RechartsPieChart, Sector } from "recharts";

// biome-ignore lint/suspicious/noExplicitAny: TODO: fix typing
const renderActiveShape = (props: any) => {
	const RADIAN = Math.PI / 180;
	const {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? "start" : "end";

	return (
		<g>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				className="fill-foreground"
			>{`${payload.name}: ${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				className="fill-muted-foreground"
			>
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

export function PieChart() {
	const chartConfig = useChartStore((state) => state.chartConfig);
	const showGrid = useChartStore((state) => state.showGrid);
	const showLegend = useChartStore((state) => state.showLegend);
	const showLabel = useChartStore((state) => state.showLabel);

	const chartData = useChartStore((state) => state.chartData);
	const chartDataPath = useChartStore((state) => state.chartDataPath);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const colors = useChartStore((state) => state.colors);

	const values = buildRechartsValues(chartDataPath, chartData);

	const valuesWithFill = values.map((data, index) => {
		return {
			...data,
			name: data[chartDataPath[0].uuid],
			fill: colors[index % colors.length].hex,
		};
	});

	return (
		// @ts-expect-error - Expect a single child, but works with multiple
		<ChartContainer config={chartConfig}>
			{showGrid && (
				<div
					className={cn(
						"absolute inset-0 z-50 m-auto flex h-max w-[110px] flex-col items-center justify-center",
						showLegend && "pb-8",
					)}
				>
					<ChartFocusStatsTitle className="h-auto text-center font-bold text-3xl" />
					<ChartFocusStatsValue className="h-auto text-center text-xs" />
				</div>
			)}

			{/* @ts-expect-error - Recharts doesn't have overflow prop, but it works */}
			<RechartsPieChart data={values} overflow="visible">
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				{showLegend && (
					<ChartLegend
						verticalAlign="bottom"
						wrapperStyle={{ paddingTop: 20 }}
						content={<ChartLegendContent />}
					/>
				)}

				<Pie
					data={valuesWithFill}
					labelLine
					activeShape={renderActiveShape}
					dataKey={chartDataPath[1].uuid}
					isAnimationActive={false}
					activeIndex={activeIndex ?? undefined}
					innerRadius={showGrid ? 70 : 0}
					strokeWidth={1.4}
					paddingAngle={1}
					fontSize={13}
					startOffset={50}
					onClick={(_, index) => {
						setActiveIndex((prev) => (prev === index ? null : index));
					}}
				>
					{showLabel && (
						<LabelList
							className="fill-background"
							stroke="none"
							fontSize={12}
						/>
					)}
				</Pie>
			</RechartsPieChart>
		</ChartContainer>
	);
}
