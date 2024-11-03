import { useChartStore } from "@/app/(main)/chart.store";
import { LineChartCurveType } from "@/app/(main)/components/navigation/type/line-chart-curve-type";
import { ShowDotsSwitch } from "@/app/(main)/components/navigation/type/show-dots-switch";
import { Label } from "@/components/label";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table"
import { cn } from "@/lib/utils";

export const SidePanelData: React.FC = () => {
	const chartData = useChartStore((state) => state.chartData);

	return (
		<div className="flex flex-col gap-4 h-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Method</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-medium">INV001</TableCell>
						<TableCell>Paid</TableCell>
						<TableCell>Credit Card</TableCell>
						<TableCell className="text-right">$250.00</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};
