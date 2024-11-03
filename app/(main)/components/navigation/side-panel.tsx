"use client";

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

export const SidePanel = () => {
	const [expanded, setExpanded] = useState(false);
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div
			className={cn(
				"absolute inset-y-0 right-0 z-50 p-4 transition-width",
				expanded ? "w-full" : "w-full lg:w-[max(500px,33vw)]",
			)}
		>
			<Card className="h-full">
				<CardHeader>
					<div className="flex flex-row items-center justify-between gap-2">
						<CardTitle>Customize your chart</CardTitle>
						<ExportImage />
					</div>
					<DirectionAwareTabs tabs={tabs} onChange={setActiveTab} />
				</CardHeader>
				<CardContent>
					{activeTab === 0 && <SidePanelType />}
					{activeTab === 1 && <div>forest</div>}
					{activeTab === 2 && <div>default</div>}
				</CardContent>
			</Card>
		</div>
	);
};
