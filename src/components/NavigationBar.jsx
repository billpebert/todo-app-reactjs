import { Link } from "react-router-dom";

export default function NavigationBar() {
	return (
		<>
			<nav className="py-4 md:pt-[38px] md:pb-[31px] bg-skyBlue mb-7 md:mb-11">
				<div className="container">
					<h3 className="uppercase text-white font-bold text-lg md:text-2xl">
						<Link to="/" data-cy="header-title">
							TO DO LIST APP
						</Link>
					</h3>
				</div>
			</nav>
		</>
	);
}
