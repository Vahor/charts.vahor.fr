export const Panel: React.FC<{
	title: string;
	children: React.ReactNode;
}> = ({ title, children }) => {
	return (
		<div className="flex flex-col gap-4 p-8 rounded-lg border border-solid border-card">
			<h2 className="text-xl font-bold">{title}</h2>
			{children}
		</div>
	);
};
