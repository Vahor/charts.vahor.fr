"use client";

import type { ChartData } from "@/app/(main)/chart.store";
import { useChartStore } from "@/app/(main)/chart.store";
import { buildSafeEvalFunction } from "@/lib/safe-eval";
import { cn } from "@/lib/utils";
import { randomUUID } from "@/lib/uuid";
import * as csvParser from "papaparse";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const Dropzone: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const setChartData = useChartStore((state) => state.setChartData);
	const setChartDataPath = useChartStore((state) => state.setChartDataPath);

	const dropzone = useDropzone({
		maxFiles: 1,
		noClick: true,
		multiple: false,
		accept: {
			"text/csv": [],
			"application/json": [],
		},
		async onDrop(acceptedFiles, fileRejections, event) {
			if (isLoading) {
				toast.error("Please wait for the previous file to be uploaded");
				return;
			}
			const id = toast.loading("Uploading file...");
			try {
				setIsLoading(true);
				if (fileRejections.length > 0) {
					if (fileRejections[0].errors[0].code === "file-invalid-type") {
						toast.error("Only CSV and JSON files are supported", { id });
						return;
					}
					toast.error(fileRejections[0].errors[0].message, { id });
					return;
				}

				const file = acceptedFiles[0];
				const fileType = file.type;
				let data: ChartData | undefined;
				if (fileType === "text/csv") {
					const csv = await file.text();
					const parser = csvParser.parse(csv, {
						header: true,
						skipEmptyLines: true,
					});
					data = parser.data as ChartData;
				}

				if (fileType === "application/json") {
					const json = await file.text();
					data = JSON.parse(json);
				}

				if (!data) {
					toast.error("Invalid file format", { id });
					return;
				}

				// fail if the data is empty
				if (data.length === 0) {
					toast.error("Data is empty", { id });
					return;
				}

				// make sure that the data is valid
				// all rows should have the same columns
				const keysA = Object.keys(data[0]);
				for (let i = 1; i < data.length; i++) {
					const keysB = Object.keys(data[i]);
					if (
						keysA.length !== keysB.length ||
						keysA.some((key, i) => keysB[i] !== key)
					) {
						toast.error(
							`Columns are not the same on all rows, found an error on row ${i}`,
							{ id },
						);
						return;
					}
				}

				setChartData(data);
				const chartDataPath = keysA.map((key) => {
					const evalPath = `data['${key}']`;
					return {
						evalPath,
						name: key,
						uuid: randomUUID(),
						evalPathFunction: buildSafeEvalFunction(evalPath),
					};
				});
				setChartDataPath(chartDataPath);
			} catch (e) {
				toast.error("Error while uploading file", { id });
				console.error(e);
			} finally {
				toast.success("File uploaded", { id });
				setIsLoading(false);
			}
		},
	});

	return (
		<div
			className={cn(
				"absolute inset-0 m-1 rounded-lg border-2 border-transparent border-dashed",
				dropzone.isDragActive && dropzone.isDragReject && "border-destructive",
				dropzone.isDragActive && dropzone.isDragAccept && "border-primary",
				isLoading && "opacity-40",
			)}
			{...dropzone.getRootProps()}
		>
			<input {...dropzone.getInputProps()} hidden />
			{children}
		</div>
	);
};
