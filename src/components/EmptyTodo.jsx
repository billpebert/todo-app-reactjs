import React from "react";

export default function EmptyActivity() {
	return (
		<div data-cy="activity-empty-state">
			<img
				src="/svg/item-list-empty.svg"
				className="h-[490px] w-auto mx-auto md:mt-[60px] hidden md:block"
				alt=""
			/>
			<img
				src="/svg/item-list-empty-sm-screen.svg"
				className="w-auto mx-auto md:mt-[60px] block md:hidden mt-20"
				alt=""
			/>
		</div>
	);
}
