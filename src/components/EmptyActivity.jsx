import React from "react";

export default function EmptyActivity() {
	return (
		<div data-cy="activity-empty-state">
			<img
				src="/svg/activity-empty.svg"
				className="h-[490px] w-auto mx-auto md:mt-[60px] hidden md:block"
				alt=""
			/>
			<img
				src="/svg/activity-empty-sm-screen.svg"
				className="w-auto mx-auto md:mt-[60px] block md:hidden mt-20"
				alt=""
			/>
		</div>
	);
}
