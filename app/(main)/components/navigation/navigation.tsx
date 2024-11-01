import { ChartTypeDropdown } from "@/app/(main)/components/navigation/chart-type";
import { ExportImage } from "@/app/(main)/components/navigation/export-image";
import { LightThemeSwitch } from "@/app/(main)/components/navigation/light-theme-switch";
import { ShowHeaderSwitch } from "@/app/(main)/components/navigation/show-header-switch";
import { SubNavigation } from "@/app/(main)/components/navigation/sub-navigation";
import { Card } from "@/components/card";

export const Navigation: React.FC = () => {
	return (
		<div className="-translate-y-1/2 -translate-x-1/2 absolute bottom-0 left-1/2 z-50 mx-auto w-full max-w-screen-md px-4">
			<SubNavigation />
			<Card>
				<div className="flex flex-row items-center gap-6 p-4">
					<ChartTypeDropdown />
					<ShowHeaderSwitch />
					<LightThemeSwitch />
					<div className="flex-1" />
					<ExportImage />
				</div>
			</Card>
		</div>
	);
};
