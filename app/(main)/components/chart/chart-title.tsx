"use client";

import { Input } from "@/components/input";
import { useState } from "react";

const DEFAULT_TITLE = "Click to edit title";

export const ChartTitle: React.FC = () => {
	const [title, setTitle] = useState(DEFAULT_TITLE);

	return (
		<Input
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			placeholder="Chart title"
			data-ignore-in-export={title.length === 0 || title === DEFAULT_TITLE}
			className="p-0 border-none text-md font-semibold leading-none tracking-tight"
		/>
	);
};
