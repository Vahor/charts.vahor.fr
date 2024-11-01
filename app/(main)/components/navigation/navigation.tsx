import { ChartTypeDropdown } from "@/app/(main)/components/navigation/chart-type";
import { ExportImage } from "@/app/(main)/components/navigation/export-image";
import { Card } from "@/components/card";

export const Navigation: React.FC = () => {
	return (
		<div className="absolute bottom-0 mx-auto max-w-screen-sm z-50 w-full left-1/2 -translate-y-1/2 -translate-x-1/2">
			<Card>
				<div className="flex flex-row gap-4 p-4">
					<ChartTypeDropdown />
					<div className="flex-1" />
					<ExportImage />
				</div>
			</Card>
		</div>
	);
};
