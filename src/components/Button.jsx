import React from "react";

export default function Button({ children, variant="danger", isDisabled=false, clickHandler, dataCy }) {
	function variantStyle(ve) {
		if (ve == "primary") {
			return "bg-skyBlue text-white";
		} else if (ve == "danger") {
			return "bg-[#ED4C5C] text-white";
		} else if (ve == "secondary") {
			return "bg-secondary text-darkBrown";
		}
	}

	return (
		<button
			type="button"
			className={`flex items-center text-xs md:text-lg font-semibold rounded-full px-[15px] md:px-7 py-2 md:py-3 disabled:bg-opacity-20 ${variantStyle(
				variant
			)}`}
			disabled={isDisabled}
			onClick={clickHandler}
			data-cy={dataCy}
		>
			{children}
		</button>
	);
}
