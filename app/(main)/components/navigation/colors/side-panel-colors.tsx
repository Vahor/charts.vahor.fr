import { ColorGrid } from "@/app/(main)/components/navigation/colors/color-grid";

export const SidePanelColors: React.FC = () => {
	return (
		<div className="flex h-full flex-col gap-4">
			<ColorGrid />
		</div>
	);
};
