"use client";

import { useChartStore } from "@/app/(main)/chart.store";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/chart";
import { Label, Pie, PieChart as RechartsPieChart } from "recharts";

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

export function PieChart() {
	const chartData = useChartStore((state) => state.chartData);
	const chartConfig = useChartStore((state) => state.chartConfig);
	const showGrid = useChartStore((state) => state.showGrid);
	const showLegend = useChartStore((state) => state.showLegend);

	const dataWithFill = chartData.map((data, index) => {
		return {
			...data,
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
				{showLegend && <ChartLegend content={<ChartLegendContent />} />}

				<Pie
					data={dataWithFill}
					labelLine={false}
					dataKey="desktop"
					nameKey="month"
					isAnimationActive={false}
					innerRadius={showGrid ? 60 : 0}
					strokeWidth={5}
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
												text
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
