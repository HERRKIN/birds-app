import { Link } from "react-router-dom";

export const Sidebar = () =>{
	return <aside className="bg-[#FBFCFF] md:w-[250px] p-4">
            <Link to="/">
		<header className="flex flex-col mb-4">
            <span className="text-lg ">The Birds App</span>
            <span className="text-sm text-slate-500">By Copilot</span>
        </header>
            </Link>
		<nav>
			<ul>
				<li className={"w-full"}>
                    <Link to="/"  className="bg-slate-500/8 p-2 rounded-md w-full block hover:bg-slate-500/10">
                    Home
                    </Link>
                </li>	
			</ul>
		</nav>
	</aside>;
};
