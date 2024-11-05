"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/chart";
import { buildRechartsValues } from "@/lib/build-values";
import { useState } from "react";
import { Label, Pie, PieChart as RechartsPieChart, Sector } from "recharts";

const colorBrewerPalette = [
	"#1f77b4",
	"#ff7f0e",
	"#2ca02c",
	"#d62728",
	"#9467bd",
	"#8c564b",
	"#e377c2",
	"#7f7f7f",
	"#bcbd22",
	"#17becf",
];

const renderActiveShape = (props) => {
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

	const chartData = useChartStore((state) => state.chartData);
	const chartDataPath = useChartStore((state) => state.chartDataPath);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const values = buildRechartsValues(chartDataPath, chartData);

	const valuesWithFill = values.map((data, index) => {
		return {
			...data,
			name: data[chartDataPath[0].uuid],
			fill: colorBrewerPalette[index % colorBrewerPalette.length],
		};
	});

	return (
		<ChartContainer config={chartConfig}>
			<RechartsPieChart>
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
					{showGrid && (
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground font-bold text-3xl"
											>
												text {activeIndex}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												Visitors
											</tspan>
										</text>
									);
								}
							}}
						/>
					)}
				</Pie>
			</RechartsPieChart>
		</ChartContainer>
	);
}
