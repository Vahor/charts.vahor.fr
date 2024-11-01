"use client";

import { Button } from "@/components/button";
import { toBlob } from "@/lib/image";
import { useHotkeys } from "@/lib/useHotkeys";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const exportSize = 4;

export const ExportImage: React.FC = () => {
	const chartWrapper = useRef<HTMLElement | null>(null);
	useEffect(() => {
		if (chartWrapper.current) {
			return;
		}
		chartWrapper.current = document.getElementById("chart-wrapper");
	}, []);

	useHotkeys("ctrl+c,cmd+c", (event) => {
		event.preventDefault();
		saveToClipboard();
	});

	const saveToClipboard = async () => {
		const id = toast.loading("Saving to clipboard...");
		if (!chartWrapper.current) {
			toast.error("Chart not found", { id });
			return;
		}

		const clipboardItem = new ClipboardItem({
			"image/png": toBlob(chartWrapper.current, {
				pixelRatio: exportSize,
			}).then((blob) => {
				if (!blob) {
					throw new Error("expected toBlob to return a blob");
				}
				return blob;
			}),
		});

		await navigator.clipboard.write([clipboardItem]);
		toast.success("Image copied to clipboard", { id });
	};

	return (
		<Button variant="default" size="sm" onClick={saveToClipboard}>
			Export image
		</Button>
	);
};
