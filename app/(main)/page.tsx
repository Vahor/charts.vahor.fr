import { Chart } from "@/app/(main)/components/chart/chart";
import { ChartWrapper } from "@/app/(main)/components/chart/chart-wrapper";
import { Navigation } from "@/app/(main)/components/navigation/navigation";

export default function Home() {
	return (
		<div>
			<main>
				<ChartWrapper>
					<Chart />
				</ChartWrapper>
			</main>
			<Navigation />
		</div>
	);
}
