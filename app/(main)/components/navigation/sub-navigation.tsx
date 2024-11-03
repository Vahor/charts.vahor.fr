"use client";
import { Card } from "@/components/card";

export const SubNavigation: React.FC = () => {
	return (
		<div className="-translate-y-full -translate-x-1/2 -z-40 absolute left-1/2 mx-auto mt-2 w-full max-w-screen-sm px-8">
			<Card>
				<div className="flex flex-row items-center justify-center gap-6 p-4"></div>
			</Card>
		</div>
	);
};
