"use client";

import { type ChartType, useChartStore } from "@/app/(main)/chart.store";
import { Button } from "@/components/button";
import { ChartBarIcon } from "@/components/icons/chart-bar-icon";
import { ChartLineIcon } from "@/components/icons/chart-line-icon";
import { ChartPieIcon } from "@/components/icons/chart-pie-icon";
import { DeleteIcon } from "@/components/icons/delete-icon";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectItemText,
	SelectTrigger,
	SelectValue,
} from "@/components/select";
import { Switch } from "@/components/switch";
import { ChevronUpIcon, TrashIcon } from "lucide-react";

export const ChartTooltipSwitch: React.FC = () => {
	const hasTooltipEnabled = useChartStore(
		(state) => state.tooltipCoordinates !== null,
	);
	const setTooltipCoordinates = useChartStore(
		(state) => state.setTooltipCoordinates,
	);
	return (
		<Button
			variant="outline"
			size="sm"
			className="hover:border-destructive"
			disabled={!hasTooltipEnabled}
			onClick={() => setTooltipCoordinates(null)}
		>
			<DeleteIcon className="size-4" />
			Tooltip
		</Button>
	);
};
