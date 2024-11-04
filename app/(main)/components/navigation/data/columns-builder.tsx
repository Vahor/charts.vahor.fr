import { Reorder } from "framer-motion"
import { useChartStore } from "@/app/(main)/chart.store";
import { DragDropVerticalIcon } from "@/components/icons/drag-drop-vertical-icon";
import { XIcon } from "lucide-react";
import { Input } from "@/components/input";
import { editor } from 'monaco-editor';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useRef } from "react";

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
	const chartData0 = useChartStore((state) => state.chartData[0]);
	const setChartDataPath = useChartStore((state) => state.setChartDataPath);
	const setChartDataPathName = useChartStore((state) => state.updateChartDataPathName);
	const setChartDataPathEvalPath = useChartStore((state) => state.updateChartDataPathEvalPath);

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

	const onMonacoMount = (editor: any, monaco: any) => {
		console.log(monaco);
		// // validation settings
		monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
			noSemanticValidation: true,
			noSyntaxValidation: false
		});
		//
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
		monaco.languages.typescript.javascriptDefaults.addExtraLib(editorCustomLib, editorCustomLibUri);
	};


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
							<DragDropVerticalIcon className="size-4" />
							<div className="flex-grow flex-col gap-1">
								<Input
									value={column.name}
									onChange={(e) => setChartDataPathName(index, e.target.value)}
									placeholder="Column name"
									className="h-8 rounded-md border border-input bg-transparent px-2 text-sm"
								/>
								<Editor
									defaultValue={column.evalPath}
									defaultLanguage="javascript"
									theme="vs-dark"
									options={editorOptions}
									height="2rem"
									onChange={(value) => setChartDataPathEvalPath(index, value ?? "")}
									onMount={onMonacoMount}
								/>
							</div>
							<XIcon className="cursor-pointer size-4 hover:text-destructive" onClick={() => setChartDataPath(chartDataPath.filter((_, i) => i !== index))} />
						</Reorder.Item>
					);
				})}
			</Reorder.Group>
		</div>
	);
};
