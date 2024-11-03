"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

type Tab = {
	id: number;
	label: string;
};

interface DirectionAwareTabsProps {
	tabs: Tab[];
	onChange?: (tabId: number) => void;
}

function DirectionAwareTabs({ tabs, onChange }: DirectionAwareTabsProps) {
	const [activeTab, setActiveTab] = useState(0);
	const handleTabClick = (newTabId: number) => {
		if (newTabId !== activeTab) {
			setActiveTab(newTabId);
			if (onChange) {
				onChange(newTabId);
			}
		}
	};

	return (
		<div
			className={cn(
				"flex w-full cursor-pointer space-x-4 border border-transparent border-b-border",
			)}
		>
			{tabs.map((tab) => (
				<button
					type="button"
					key={tab.id}
					onClick={() => handleTabClick(tab.id)}
					className={cn(
						"relative flex items-center gap-2 px-3.5 py-4 font-medium text-neutral-200 text-xs transition focus-visible:outline-none sm:text-sm",
						activeTab === tab.id
							? "text-primary"
							: "text-neutral-200/80 hover:text-neutral-300/60",
					)}
					style={{ WebkitTapHighlightColor: "transparent" }}
				>
					{activeTab === tab.id && (
						<motion.span
							layoutId="border"
							className="-bottom-px absolute inset-x-0 z-10 border border-primary"
							transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
						/>
					)}

					{tab.label}
				</button>
			))}
		</div>
	);
}
export { DirectionAwareTabs };
