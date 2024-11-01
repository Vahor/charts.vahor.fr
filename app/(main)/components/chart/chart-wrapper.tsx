import { ChartTitle } from "@/app/(main)/components/chart/chart-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";

export const ChartWrapper: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<div className="absolute top-1/2 pb-32 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-md xl:max-w-screen-lg ">
			<div id="chart-wrapper" className="p-8">
				<Card>
					<CardHeader>
						<ChartTitle />
					</CardHeader>
					<CardContent>{children}</CardContent>
				</Card>
			</div>
		</div>
	);
};
