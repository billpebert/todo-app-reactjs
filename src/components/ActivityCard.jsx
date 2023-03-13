import React from "react";
import { Link } from "react-router-dom";

export default function ActivityCard({ id, title, date, clickHandler, index }) {
	function formattedDate(date) {
		// console.log(clickHandler(title, id))
		let d = new Date(date);
		const str = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(d);
		return str;
	}

	return (
		<div
			className="relative rounded-xl bg-white shadow-custom flex flex-col py-[22px] px-6 min-h-[150px] md:min-h-[235px]"
			data-cy="activity-item"
		>
			<h5 className="text-sm md:text-lg font-bold relative h-full" data-cy="activity-item-title">
				<Link to={`/activity/${id}`} className="inset-0 absolute">
					{title}
				</Link>
			</h5>
			<div className="flex items-center justify-between mt-auto">
				<p className="text-[10px] md:text-sm text-grey font-medium" data-cy="activity-item-date">
					{formattedDate(date)}
				</p>
				<button
					type="button"
					className="relative z-10"
					data-cy="activity-item-delete-button"
					onClick={() => clickHandler(id, title)}
				>
					<img src="/svg/ic-trash.svg" className="w-3 md:w-6" alt="" />
				</button>
			</div>
		</div>
	);
}
