import { useChartStore } from "@/app/(main)/chart.store";
import { Button } from "@/components/button";
import { DragDropVerticalIcon } from "@/components/icons/drag-drop-vertical-icon";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Reorder } from "framer-motion";
import { HexColorPicker } from "react-colorful";

export const ColorGrid = () => {
	const colors = useChartStore((state) => state.colors);
	const setColors = useChartStore((state) => state.setColors);
	const updateColor = useChartStore((state) => state.updateColor);

	return (
		<div className="flex flex-col gap-4">
			<Reorder.Group axis="y" values={colors} onReorder={setColors}>
				{colors.map((color, index) => {
					return (
						<Reorder.Item
							key={color.uuid}
							value={color}
							className="relative flex cursor-grab items-center gap-2 rounded-md border border-border bg-background px-2 py-3"
						>
							<DragDropVerticalIcon className="size-4 shrink-0" />
							<Label>
								Color{" "}
								<span className="inline-block min-w-[2ch]">{index + 1}</span>
							</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="w-max font-mono"
										size="sm"
									>
										<div
											className="size-6 rounded-full border border-border"
											style={{ backgroundColor: color.hex }}
										/>

										{color.hex}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="space-y-2">
									<HexColorPicker
										color={color.hex}
										onChange={(hex) => updateColor(index, hex)}
									/>
									<div className="flex items-center gap-2">
										<Label>Hex color</Label>
										<Input
											value={color.hex}
											onChange={(e) => updateColor(index, e.target.value)}
											placeholder="Hex color"
											className="w-[12ch]"
										/>
									</div>
								</PopoverContent>
							</Popover>
						</Reorder.Item>
					);
				})}
			</Reorder.Group>
		</div>
	);
};
