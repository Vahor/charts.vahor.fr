import { ExportImage } from "@/app/(main)/components/navigation/export-image";
import { SidePanel } from "@/app/(main)/components/navigation/side-panel";
import { ChartTypeDropdown } from "@/app/(main)/components/navigation/type/chart-type";
import { LightThemeSwitch } from "@/app/(main)/components/navigation/type/light-theme-switch";
import { ShowHeaderSwitch } from "@/app/(main)/components/navigation/type/show-header-switch";

export const Navigation: React.FC = () => {
	return (
		<SidePanel>
			<div className="flex flex-row items-center gap-6 p-4">
				<ChartTypeDropdown />
				<ShowHeaderSwitch />
				<LightThemeSwitch />
				<div className="flex-1" />
				<ExportImage />
			</div>
		</SidePanel>
	);
};
