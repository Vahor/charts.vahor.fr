export const randomUUID = () => {
	if (typeof window !== "undefined") {
		return window.crypto.randomUUID();
	}
	return "not supported";
};

export const randomColor = () => {
	// hex color
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
};
