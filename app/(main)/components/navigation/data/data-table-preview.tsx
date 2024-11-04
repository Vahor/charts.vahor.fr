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
				{chartDataPath.map(({ name: column }) => (
					<col key={column} className={cn(column === idColumn.name && "w-[100px]")} />
				))}
			</colgroup>
			<TableHeader>
				<TableRow>
					{chartDataPath.map(({ name: column }) => (
						<TableHead key={column}>
							{column}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{chartData.slice(0, 50).map((row) => {
					const id = idColumn.evalPathFunction(row);
					return (
						<TableRow key={id}>
							{chartDataPath.map((column) => {
								const isId = column.name === idColumn.name;
								const value = isId ? id : column.evalPathFunction(row);
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
