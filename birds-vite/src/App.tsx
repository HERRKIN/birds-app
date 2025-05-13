
import { Outlet } from 'react-router-dom';

import { Sidebar } from './components/sidebar';
const App = () => {
	return (
		<main className="flex flex-col md:flex-row h-screen">
			<Sidebar />
			<section id="scrollable-container" className="flex-1 bg-white border-l border-gray-200 overflow-y-auto">
				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</section>
		</main>
	);
};

export default App;
