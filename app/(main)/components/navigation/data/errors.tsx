import { useChartStore } from "@/app/(main)/chart.store";
import { Alert, AlertDescription, AlertTitle } from "@/components/alert";



export const ErrorMessage: React.FC = () => {
	const error = useChartStore((state) => state.chartDataPathError);

	if (error === undefined) {
		return null;
	}

	return (
		<Alert variant="destructive">
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				{error}
			</AlertDescription>
		</Alert>
	)
};
