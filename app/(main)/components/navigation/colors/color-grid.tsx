import { useChartStore } from "@/app/(main)/chart.store";
import { Button } from "@/components/button";
import { DragDropVerticalIcon } from "@/components/icons/drag-drop-vertical-icon";
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
							<Label>Color {index + 1}</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" className="w-max" size="sm">
										<div
											className="size-6 rounded-full border border-border"
											style={{ backgroundColor: color.hex }}
										/>

										{color.hex}
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<HexColorPicker
										color={color.hex}
										onChange={(hex) => updateColor(index, hex)}
									/>
								</PopoverContent>
							</Popover>
						</Reorder.Item>
					);
				})}
			</Reorder.Group>
		</div>
	);
};
