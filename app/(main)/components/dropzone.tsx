"use client";

import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const Dropzone: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const dropzone = useDropzone({
		maxFiles: 1,
		noClick: true,
		multiple: false,
		accept: {
			"text/csv": [],
			"application/json": [],
		},
		onDrop(acceptedFiles, fileRejections, event) {
			if (fileRejections.length > 0) {
				if (fileRejections[0].errors[0].code === "file-invalid-type") {
					toast.error("Only CSV and JSON files are supported");
					return;
				}
				toast.error(fileRejections[0].errors[0].message);
				return;
			}
		},
	});

	return (
		<div
			className={cn(
				"absolute inset-0 m-1 rounded-lg border-2 border-transparent border-dashed",
				dropzone.isDragActive && dropzone.isDragReject && "border-destructive",
				dropzone.isDragActive && dropzone.isDragAccept && "border-primary",
			)}
			{...dropzone.getRootProps()}
		>
			<input {...dropzone.getInputProps()} hidden />
			{children}
		</div>
	);
};
