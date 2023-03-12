import React from 'react'
import Button from './Button'

export default function ModalCreate() {
  return (
<div
		data-te-modal-init
		className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
		id="exampleModal"
		tabIndex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div
			data-te-modal-dialog-ref
			className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto mt-20 min-[576px]:max-w-[800px] px-5"
		>
			<div
				className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
			>
				<div
					className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4"
				>
					<h5 className="text-lg font-medium leading-normal text-neutral-800" id="exampleModalLabel">
						Tambah List
					</h5>
					<button
						type="button"
						className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
						data-te-modal-dismiss
						aria-label="Close"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div
					className="relative flex-auto flex flex-col gap-[26px] p-4 md:px-[30px] md:py-7"
					data-te-modal-body-ref
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="" className="text-dark font-semibold text-xs">Name List Item</label>
						<input
							type="text"
							name="name"
							id=""
							placeholder="Tambahkan nama list item"
							className="placeholder:text-[#A4A4A4] text-dark py-[14px] px-[18px] text-sm md:text-base outline-none border border-[#e5e5e5] rounded-md focus:ring ring-sky-200"
							v-model="titleForm"
							data-cy="modal-add-name-input"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="" className="text-dark font-semibold text-xs">Name List Item</label>
						{/* <PriorityOptions
							priorities="priorityOptions"
							update-selected="updateSelected"
						/> */}
					</div>
				</div>
				<div
					className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4"
				>
					<Button
						variant="primary"
						// :disabled="allowSubmit == false"
						// @click="$emit('createItem', titleForm, activityId, selectedPriority);
						// 	titleForm = '';
						// 	selectedPriority = 'very-high';
						// "
						data-te-modal-dismiss
						data-cy="modal-add-save-button"
					>
                        Simpan
                    </Button>
				</div>
			</div>
		</div>
	</div>
  )
}
