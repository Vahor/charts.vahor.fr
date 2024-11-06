import { ChartTypeDropdown } from "@/app/(main)/components/navigation/type/chart-type";
import { LightThemeSwitch } from "@/app/(main)/components/navigation/type/light-theme-switch";
import { ShowGridSwitch } from "@/app/(main)/components/navigation/type/show-grid-switch";
import { ShowHeaderSwitch } from "@/app/(main)/components/navigation/type/show-header-switch";
import { ShowLegendSwitch } from "@/app/(main)/components/navigation/type/show-legend-switch";

import { useChartStore } from "@/app/(main)/chart.store";
import { NavigationGroup } from "@/app/(main)/components/navigation/navigation-group";
import { LineChartCurveType } from "@/app/(main)/components/navigation/type/line-chart-curve-type";
import { ShowDotsSwitch } from "@/app/(main)/components/navigation/type/show-dots-switch";
import { ShowFooterSwitch } from "@/app/(main)/components/navigation/type/show-footer-switch";
import { ShowLabelSwitch } from "@/app/(main)/components/navigation/type/show-label";
import { XAxisLabelSwitch } from "@/app/(main)/components/navigation/type/x-axis-label-switch";
import { YAxisLabelSwitch } from "@/app/(main)/components/navigation/type/y-axis-label-switch";

export const SidePanelType: React.FC = () => {
	const chartType = useChartStore((state) => state.chartType);
	return (
		<div className="flex flex-col gap-4">
			<NavigationGroup title="Appearance">
				<ChartTypeDropdown />
				<ShowHeaderSwitch />
				<ShowFooterSwitch />
				<LightThemeSwitch />
				<ShowGridSwitch />
				<ShowLegendSwitch />
				<ShowLabelSwitch />
				<YAxisLabelSwitch />
				<XAxisLabelSwitch />
				{(chartType === "line" || chartType === "area") && <ShowDotsSwitch />}
				{chartType === "line" && <LineChartCurveType />}
			</NavigationGroup>
		</div>
	);
};
