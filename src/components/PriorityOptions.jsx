import React, { useState } from "react";

export default function PriorityOptions({updateSelected, selectedPriority}) {
	const priorities = ["very-high", "high", "normal", "low", "very-low"];
	// const [selectedPriority, setSelectedPriority] = useState("Pilih priority");

	function generatePriority(valPriority) {
		if (valPriority == "very-high") {
			return "bg-danger";
		} else if (valPriority == "high") {
			return "bg-warning";
		} else if (valPriority == "normal") {
			return "bg-success";
		} else if (valPriority == "low") {
			return "bg-cyan";
		} else if (valPriority == "very-low") {
			return "bg-magenta";
		} else {
			return "hidden";
		}
	}

	function rotateArrow() {
		const arrowIcon = document.getElementById("arrowDD");
		const myDropdown = document.getElementById("dropDownPriority");
		myDropdown.addEventListener("shown.te.dropdown", () => {
			arrowIcon.classList.add("rotate-180");
		});
		myDropdown.addEventListener("hidden.te.dropdown", () => {
			arrowIcon.classList.remove("rotate-180");
		});
	}

    const selectPriority = (val) => {
        // setSelectedPriority(val)
        updateSelected(val)
    }

	return (
		<div className="relative w-max" data-te-dropdown-ref>
			<button
				className="flex items-center whitespace-nowrap transition duration-150 ease-in-out text-dark py-[14px] px-[18px] text-sm md:text-base outline-none border border-[#e5e5e5] rounded-md focus:ring ring-sky-200 capitalize w-max group"
				type="button"
				id="dropDownPriority"
				data-te-dropdown-toggle-ref
				aria-expanded="false"
				data-te-dropdown-animation="off"
				onClick={rotateArrow}
				data-cy="modal-add-priority-item"
			>
				<span
					className={`md:w-[9px] w-[5px] md:h-[9px] h-[5px] rounded-full mr-5 ${generatePriority(
						selectedPriority
					)}`}
				></span>
				{ selectedPriority == "normal" ? "Medium" : selectedPriority.split("-").toString().replace(/,/g, " ") }

				{/* <!-- Arrow --> */}
				<img src="/svg/ic-chevron-down.svg" className="ml-10" id="arrowDD" alt="" />
			</button>
			<ul
				className="absolute z-[1000] float-left m-0 hidden w-full list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-sm md:text-base shadow-lg [&[data-te-dropdown-show]]:block divide-y divide-[#e5e5e5]"
				aria-labelledby="dropDownPriority"
				data-te-dropdown-menu-ref
			>
				{priorities.map((priority, index) => {
					return (
						<li key={index}>
							<a
								className="flex items-center w-full whitespace-nowrap bg-transparent py-2 md:py-[14px] px-4 text-sm md:text-base font-normal text-[#4A4A4A] hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 capitalize"
								href="#"
								data-te-dropdown-item-ref
                                onClick={() => selectPriority(priority)}
								data-cy={`modal-add-priority-${priority == "normal" ? "medium" : priority}`}
							>
								<span
									className={`md:w-[9px] w-[5px] md:h-[9px] h-[5px] rounded-full mr-5 ${generatePriority(
										priority
									)}`}
								></span>
								{priority == "normal" ? "Medium" : priority.split("-").toString().replace(/,/g, " ")}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
