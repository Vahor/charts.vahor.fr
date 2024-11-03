export const NavigationItem: React.FC<{
	title: string;
	children: React.ReactNode;
	id: string;
}> = ({ title, children, id }) => {
	return (
		<>
			<div className="flex h-6 items-center">{children}</div>
			<label
				htmlFor={id}
				className="break-keep font-medium text-muted-foreground text-xs tracking-tight"
			>
				{title}
			</label>
		</>
	);
};
