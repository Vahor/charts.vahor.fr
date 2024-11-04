export const randomUUID = () => {
	if (typeof window !== "undefined") {
		return window.crypto.randomUUID();
	}
	return "not supported";
};
