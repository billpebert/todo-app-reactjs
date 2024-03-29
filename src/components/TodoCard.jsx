import React from "react";
import IconPencil from "../components/icon/IconPencil";
import Trash from "../components/icon/Trash";

export default function TodoCard({
	id,
	priority,
	label,
	isActive,
	markAsDone,
	passToModalDelete,
	passToModalEdit,
	index,
}) {
	function generatePriority(valPriority) {
		if (valPriority == "very-high") {
			return "bg-danger";
		} else if (valPriority == "high") {
			return "bg-warning";
		} else if (valPriority == "normal") {
			return "bg-success";
		} else if (valPriority == "low") {
			return "bg-cyan";
		} else {
			return "bg-magenta";
		}
	}

	return (
		<div
			className="rounded-xl bg-white shadow-custom flex flex-col py-[18px] md:py-[26px] px-5 md:px-6 w-full"
			data-cy="todo-item"
		>
			<div className="inline-flex items-center justify-between">
				<div className="inline-flex gap-4 items-center">
					<input
						type="checkbox"
						name="isFinish"
						id={`${label}Checkbox`}
						className="hidden-box"
						checked={!isActive}
						onClick={() => {
							markAsDone(id, !isActive);
						}}
						onChange={(e) => {}}
					/>
					<label
						htmlFor={`${label}Checkbox`}
						className="check--label cursor-pointer"
						data-cy="todo-item-checkbox"
					>
						<span className="check--label-box"></span>
						<span className="check--label-text">
							<span
								className={`md:w-[9px] w-[5px] md:h-[9px] h-[5px] rounded-full ${generatePriority(
									priority
								)}`}
								data-cy="todo-item-priority-indicator"
							></span>
							<p className="font-medium text-sm md:text-lg" data-cy="todo-item-title">
								{label}
							</p>
						</span>
					</label>
					<button
						type="button"
						className="w-3 md:w-6"
						data-te-toggle="modal"
						data-te-target="#exampleModal"
						onClick={() => passToModalEdit(id, label, priority)}
						data-cy="todo-item-edit-button"
					>
						<IconPencil />
					</button>
				</div>
				<button
					type="button"
					className="w-4 md:w-6"
					data-cy="todo-item-delete-button"
					onClick={() => {
						passToModalDelete(id, label);
					}}
				>
					<Trash />
				</button>
			</div>
		</div>
	);
}
