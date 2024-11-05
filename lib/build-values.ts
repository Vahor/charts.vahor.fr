import type { ChartData, ChartDataPath } from "@/app/(main)/chart.store";

export const buildRechartsValues = (
	columns: ChartDataPath,
	data: ChartData,
): ChartData => {
	// return a record with uuid as key and the evaluated value as value
	const values: ChartData = [];
	for (let i = 0; i < data.length; i++) {
		const row = data[i];
		const value: ChartData[number] = {};
		for (let j = 0; j < columns.length; j++) {
			const column = columns[j];
			value[column.uuid] = column.evalPathFunction(row) ?? 0;
		}
		values.push(value);
	}
	return values;
};
