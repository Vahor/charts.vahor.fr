"use client";

import { type ChartType, useChartStore } from "@/app/(main)/chart.store";
import { NavigationItem } from "@/app/(main)/components/navigation/navigation-item";
import { ChartAreaIcon } from "@/components/icons/chart-area-icon";
import { ChartBarIcon } from "@/components/icons/chart-bar-icon";
import { ChartLineIcon } from "@/components/icons/chart-line-icon";
import { ChartPieIcon } from "@/components/icons/chart-pie-icon";
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
	area: {
		icon: ChartAreaIcon,
		label: "Area chart",
	},
	line: {
		icon: ChartLineIcon,
		label: "Line chart",
	},
	bar: {
		icon: ChartBarIcon,
		label: "Bar chart",
	},
	pie: {
		icon: ChartPieIcon,
		label: "Pie chart",
	},
} satisfies Record<
	ChartType,
	{ icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }
>;

export const ChartTypeDropdown: React.FC = () => {
	const activeChartType = useChartStore((state) => state.chartType);
	const setChartType = useChartStore((state) => state.setChartType);
	return (
		<NavigationItem title="Chart type">
			<Select value={activeChartType} onValueChange={setChartType}>
				<SelectTrigger className="w-[60px]" icon={ChevronUpIcon}>
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
								disabled={chartType === activeChartType}
							>
								<SelectItemText>
									<ChartType.icon className="size-4" />
								</SelectItemText>
								{ChartType.label}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</NavigationItem>
	);
};
