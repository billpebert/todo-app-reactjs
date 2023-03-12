import React from 'react'

export default function TodoCard({id, priority, label, isActive, markAsDone,}) {

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
	<div className="rounded-xl bg-white shadow-custom flex flex-col py-[18px] md:py-[26px] px-5 md:px-6 w-full">
		<div className="inline-flex items-center justify-between">
			<div className="inline-flex gap-4 items-center">
				<input
					type="checkbox"
					name="isFinish"
					id={`${label}Checkbox`}
					className="hidden-box"
                    defaultChecked={!isActive}
					// @click="$emit('markAsDone', id, !isActive)"
					data-cy="todo-item-checkbox"
				/>
				<label htmlFor={`${label}Checkbox`} className="check--label cursor-pointer">
					<span className="check--label-box"></span>
					<span className="check--label-text">
						<span
							className={`md:w-[9px] w-[5px] md:h-[9px] h-[5px] rounded-full ${generatePriority(priority)}`}
						></span>
						<p className="font-medium text-sm md:text-lg">{ label + id }</p>
					</span>
				</label>
				<button
					type="button"
					className="w-3 md:w-6"
					// @click="$emit('passItemData', id, title, props.priority)"
					data-te-toggle="modal"
					data-te-target="#modalUpdate"
				>
					<img src="/svg/ic-pencil.svg" alt="" />
				</button>
			</div>
			<button
				type="button"
				className="w-4 md:w-6"
				// @click="$emit('passActivityData', id, title)"
				data-te-toggle="modal"
				data-te-target="#modalDelete"
				data-cy="todo-item-delete-button"
			>
				<img src="/svg/ic-trash.svg" alt="" />
			</button>
		</div>
	</div>
  )
}
