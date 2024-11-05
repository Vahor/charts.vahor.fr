"use client";

import { SidePanelColors } from "@/app/(main)/components/navigation/colors/side-panel-colors";
import { SidePanelData } from "@/app/(main)/components/navigation/data/side-panel-data";
import { ExportImage } from "@/app/(main)/components/navigation/export-image";
import { SidePanelType } from "@/app/(main)/components/navigation/type/side-panel-type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { DirectionAwareTabs } from "@/components/direction-aware-tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

const tabs = [
	{
		id: 0,
		label: "Type",
	},
	{
		id: 1,
		label: "Data",
	},
	{
		id: 2,
		label: "Colors",
	},
];

const expanded = false;
export const SidePanel = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div
			className={cn(
				"absolute inset-y-0 right-0 z-50 block p-4 transition-width",
				expanded ? "w-full" : "w-full lg:w-[max(500px,33vw)]",
			)}
		>
			<Card className="h-full p-0">
				<CardHeader>
					<div className="flex flex-row items-center justify-between gap-2">
						<CardTitle>Customize your chart</CardTitle>
						<ExportImage />
					</div>
					<DirectionAwareTabs tabs={tabs} onChange={setActiveTab} />
				</CardHeader>
				<CardContent className="h-[calc(100%-8rem)]">
					{activeTab === 0 && <SidePanelType />}
					{activeTab === 1 && <SidePanelData />}
					{activeTab === 2 && <SidePanelColors />}
				</CardContent>
			</Card>
		</div>
	);
};
