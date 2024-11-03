export const NavigationGroup: React.FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<div className="flex flex-col items-start gap-2">
			<span className="break-keep font-medium text-sm">{title}</span>
			<div className="grid grid-cols-[1fr_auto] gap-2 pl-2">{children}</div>
		</div>
	);
};
