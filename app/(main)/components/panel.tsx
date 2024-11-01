export const Panel: React.FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<div className="flex flex-col gap-4 rounded-lg border border-card border-solid p-8">
			<h2 className="font-bold text-xl">{title}</h2>
			{children}
		</div>
	);
};
