import { useChartStore } from "@/app/(main)/chart.store";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/table"
import { cn } from "@/lib/utils";


export const DataTablePreview: React.FC = () => {
	const chartDataPath = useChartStore((state) => state.chartDataPath);
	const chartData = useChartStore((state) => state.chartData);
	const idColumn = chartDataPath[0];

	return (
		<Table>
			<colgroup>
				{chartDataPath.map(column => (
					<col key={column.uuid} className={cn(column.uuid === idColumn.uuid && "w-[100px]")} />
				))}
			</colgroup>
			<TableHeader>
				<TableRow>
					{chartDataPath.map(column => (
						<TableHead key={column.uuid} className={cn(column.uuid === idColumn.uuid && "text-right underline")}>
							{column.name}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{chartData.slice(0, 25).map((row, i) => {
					return (
						<TableRow key={i}>
							{chartDataPath.map((column) => {
								const isId = column.uuid === idColumn.uuid;
								const value = column.evalPathFunction(row);
								return (
									<TableCell key={column.name} className={cn(isId && "text-right font-medium")}>
										{value}
									</TableCell>
								);
							})}
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
};
