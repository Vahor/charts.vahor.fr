import { Chart } from "@/app/(main)/components/chart/chart";
import { ChartWrapper } from "@/app/(main)/components/chart/chart-wrapper";
import { SidePanel } from "@/app/(main)/components/navigation/side-panel";

export default function Home() {
	return (
		<div>
			<main>
				<ChartWrapper>
					<Chart />
				</ChartWrapper>
			</main>
			<SidePanel />
		</div>
	);
}
