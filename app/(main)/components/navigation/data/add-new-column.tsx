import { useChartStore } from "@/app/(main)/chart.store";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/button";

export const AddNewColumn = () => {
	const addNewColumn = useChartStore((state) => state.addNewChartDataPath);

	return (
		<Button className="w-full" size="sm" onClick={addNewColumn}>
			<PlusIcon />
			Add new column
		</Button>
	);
};
