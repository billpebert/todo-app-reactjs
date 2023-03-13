import { Link } from "react-router-dom";

export default function NavigationBar() {
	return (
		<>
			<nav className="py-4 md:pt-[38px] md:pb-[31px] bg-skyBlue mb-7 md:mb-11" data-cy="header-background">
				<div className="container">
					<Link to="/">
						<h3 className="uppercase text-white font-bold text-lg md:text-2xl" data-cy="header-title">TO DO LIST APP</h3>
					</Link>
				</div>
			</nav>
		</>
	);
}
