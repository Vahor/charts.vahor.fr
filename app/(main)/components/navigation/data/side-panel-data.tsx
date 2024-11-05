import { AddNewColumn } from "@/app/(main)/components/navigation/data/add-new-column";
import { ColumnsBuilder } from "@/app/(main)/components/navigation/data/columns-builder";
import { DataTablePreview } from "@/app/(main)/components/navigation/data/data-table-preview";
import { ErrorMessage } from "@/app/(main)/components/navigation/data/errors";
import { Label } from "@/components/label";

export const SidePanelData: React.FC = () => {

	return (
		<div className="flex flex-col gap-4 h-full">

			<div>
				<Label className="text-muted-foreground">Columns</Label>
				<ColumnsBuilder />
			</div>
			<AddNewColumn />
			<ErrorMessage />
			<div className="overflow-y-auto">
				<Label className="text-muted-foreground">Raw data</Label>
				<DataTablePreview />
			</div>
		</div>
	);
};
