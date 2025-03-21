import type { ChartData } from "@/app/(main)/chart.store";

export const buildSafeEvalFunction = (code: string) => {
	if (
		code.length === 0 ||
		code.trim() === "" ||
		code.toLowerCase() === "data"
	) {
		return noop;
	}
	try {
		return new Function(
			"data",
			`
    const console = undefined;
    const document = undefined;
    const window = undefined;
    const localStorage = undefined;
    const fetch = undefined;

    try {
      return ${code};
    } catch (e) {
      return undefined;
    }
  `,
		) as (data: ChartData[number]) => string | number | undefined;
	} catch (e) {
		return noop;
	}
};

export const noop = () => undefined;
