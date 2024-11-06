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
				id={`${id}-label`}
				className="break-keep font-medium text-muted-foreground text-xs tracking-tight"
			>
				{title}
			</label>
		</>
	);
};
