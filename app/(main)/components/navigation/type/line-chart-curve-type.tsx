"use client";

import { type LineChartType, useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectItemText,
	SelectTrigger,
	SelectValue,
} from "@/components/select";
import { ChevronUpIcon } from "lucide-react";

const ChartTypeIcon = {
	step: {
		label: "Step",
	},
	linear: {
		label: "Spikes",
	},
	natural: {
		label: "Smooth",
	},
} satisfies Record<LineChartType, { label: string }>;

export const LineChartCurveType: React.FC = () => {
	const lineChartType = useChartStore((state) => state.lineChartType);
	const setLineChartType = useChartStore((state) => state.setLineChartType);

	return (
		<NavigationItem title="Chart type" id="line-chart-curve-type">
			<Select value={lineChartType} onValueChange={setLineChartType}>
				<SelectTrigger
					className="w-[100px]"
					icon={ChevronUpIcon}
					id="line-chart-curve-type"
					aria-labelledby="line-chart-curve-type-label"
				>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{Object.keys(ChartTypeIcon).map((chartType) => {
						const ChartType =
							ChartTypeIcon[chartType as keyof typeof ChartTypeIcon];
						return (
							<SelectItem
								key={chartType}
								value={chartType}
								textValue={ChartType.label}
								disabled={chartType === lineChartType}
							>
								<SelectItemText>{ChartType.label}</SelectItemText>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</NavigationItem>
	);
};
