export const NavigationItem: React.FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<div className="flex flex-col items-start gap-2">
			<span className="break-keep font-medium text-muted-foreground text-xs tracking-tight">
				{title}
			</span>
			<div className="flex h-6 items-center">{children}</div>
		</div>
	);
};
