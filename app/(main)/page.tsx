import { Chart } from "@/app/(main)/components/chart/chart";
import { ChartWrapper } from "@/app/(main)/components/chart/chart-wrapper";
import { Dropzone } from "@/app/(main)/components/dropzone";
import { SidePanel } from "@/app/(main)/components/navigation/side-panel";

export default function Home() {
	return (
		<div>
			<Dropzone>
				<main>
					<ChartWrapper>
						<Chart />
					</ChartWrapper>
				</main>
				<SidePanel />
			</Dropzone>
		</div>
	);
}
