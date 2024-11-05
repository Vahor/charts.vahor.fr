import { Reorder } from "framer-motion"
import { ChartDataPath, useChartStore } from "@/app/(main)/chart.store";
import { DragDropVerticalIcon } from "@/components/icons/drag-drop-vertical-icon";
import { XIcon } from "lucide-react";
import { Input } from "@/components/input";
import { editor } from 'monaco-editor';
import Editor from '@monaco-editor/react';
import { useCallback, useEffect, useRef } from "react";
import React from "react";
import { cn } from "@/lib/utils";

// Copied from https://github.com/vikyd/vue-monaco-singleline/blob/master/src/monaco-singleline.vue
const editorOptions: editor.IStandaloneEditorConstructionOptions = {
	fontSize: 14,
	fontWeight: 'normal',
	wordWrap: 'off',
	lineNumbers: 'off',
	lineNumbersMinChars: 0,
	overviewRulerLanes: 0,
	overviewRulerBorder: false,
	hideCursorInOverviewRuler: true,
	lineDecorationsWidth: 0,
	glyphMargin: false,
	folding: false,
	scrollBeyondLastColumn: 0,
	scrollbar: {
		horizontal: 'hidden',
		vertical: 'hidden',
		// avoid can not scroll page when hover monaco
		alwaysConsumeMouseWheel: false,
	},
	// disable `Find`
	find: {
		addExtraSpaceOnTop: false,
		autoFindInSelection: 'never',
		seedSearchStringFromSelection: "never",
	},
	minimap: { enabled: false },
	// see: https://github.com/microsoft/monaco-editor/issues/1746
	wordBasedSuggestions: "off",
	// avoid links underline
	links: false,
	// avoid highlight hover word
	occurrencesHighlight: "off",
	cursorStyle: 'line-thin',
	// hide current row highlight grey border
	// see: https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html#renderlinehighlight
	renderLineHighlight: 'none',
	contextmenu: false,
	// default selection is rounded
	roundedSelection: false,
	hover: {
		// unit: ms
		// default: 300
		delay: 100,
	},
	acceptSuggestionOnEnter: 'on',
	// auto adjust width and height to parent
	// see: https://github.com/Microsoft/monaco-editor/issues/543#issuecomment-321767059
	automaticLayout: true,
	// if monaco is inside a table, hover tips or completion may casue table body scroll
	fixedOverflowWidgets: true,
};


export const ColumnsBuilder: React.FC<{
}> = () => {
	const chartDataPath = useChartStore((state) => state.chartDataPath);
	const setChartDataPath = useChartStore((state) => state.setChartDataPath);
	const setChartDataPathName = useChartStore((state) => state.updateChartDataPathName);

	// disable enter
	useEffect(() => {
		const controller = new AbortController();
		window.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
			}
		}, { signal: controller.signal });

		return () => {
			controller.abort();
		};
	}, []);


	return (
		<div className="flex flex-col gap-4">
			<Reorder.Group axis="y" values={chartDataPath} onReorder={setChartDataPath}>
				{chartDataPath.map((column, index) => {
					return (
						<Reorder.Item
							key={column.uuid}
							value={column}
							className="p-2 rounded-md border border-border bg-background flex items-center gap-2 cursor-grab relative"
						>
							<DragDropVerticalIcon className="size-4 shrink-0" />
							<div className="flex gap-2 flex-1 items-center">
								<div className="flex-col gap-4 flex-1 w-64">
									<Input
										value={column.name}
										onChange={(e) => setChartDataPathName(index, e.target.value)}
										placeholder="Column name"
									/>
									<MonacoEditor column={column} index={index} key={index} />
								</div>
								<XIcon className="cursor-pointer size-4 hover:text-destructive shrink-0" onClick={() => setChartDataPath(chartDataPath.filter((_, i) => i !== index))} />
							</div>
						</Reorder.Item>
					);
				})}
			</Reorder.Group>
		</div>
	);
};

const MonacoEditor = ({ column, index }: { column: ChartDataPath[number], index: number }) => {
	const setChartDataPathEvalPath = useChartStore((state) => state.updateChartDataPathEvalPath);
	const chartData0 = useChartStore((state) => state.chartData[0]);
	const result = column.evalPathFunction(chartData0);
	const isValid = result !== undefined;

	const onMonacoMount = (_: any, monaco: any) => {
		if (typeof window === "undefined") return;
		// @ts-expect-error - window.monaco is not typed
		if (window.monacoMounted) return;
		// @ts-expect-error - window.monaco is not typed
		window.monacoMounted = true;

		// validation settings
		monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: true,
			noSyntaxValidation: false
		});

		// compiler options
		monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
			target: monaco.languages.typescript.ScriptTarget.ES2015,
			allowNonTsExtensions: true
		});

		const editorCustomLib = `
	const data: ${JSON.stringify(chartData0)};
`;
		const editorCustomLibUri = "global.ts";


		// add "data" variable
		monaco.languages.typescript.typescriptDefaults.addExtraLib(editorCustomLib, editorCustomLibUri);
	}

	const onChange = (value: string | undefined) => {
		setChartDataPathEvalPath(index, value ?? "");
	}

	return (
		<div className={cn("block relative h-9 mt-2 border p-2 rounded-md border-border bg-background", !isValid && "border-destructive")}>
			<Editor
				value={column.evalPath}
				defaultLanguage="typescript"
				theme="vs-dark"
				options={editorOptions}
				onChange={onChange}
				onMount={onMonacoMount}
			/>
		</div>
	)

}
