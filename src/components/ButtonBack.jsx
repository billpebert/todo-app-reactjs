import React from "react";

export default function ButtonBack() {
	return (
		<svg
			className="hidden md:block w-5 md:w-6"
			data-cy="todo-back-button"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M6.66675 16L14.6667 24" stroke="#111111" strokeWidth="5" strokeLinecap="square" />
			<path d="M6.66675 16L14.6667 8" stroke="#111111" strokeWidth="5" strokeLinecap="square" />
		</svg>
	);
}
