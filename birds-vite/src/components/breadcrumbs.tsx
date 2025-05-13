
export const Breadcrumbs = ({crumbs, rightComponent}: {crumbs: string[], rightComponent?: React.ReactNode}) => {
	return <div className="sm:text-3xl font-bold border-b border-gray-200 py-4 flex flex-row items-center">
		<div className="flex flex-1">

		{crumbs.map(crumb => <span className={`${crumb !== crumbs[crumbs.length - 1] ? 'text-zinc-900/40 ' : 'text-gray-700 ml-2'}`}>{crumb}{crumb !== crumbs[crumbs.length - 1] && ' /'}</span>)}
		</div>
		{rightComponent && rightComponent}
	</div>;
};
