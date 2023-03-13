import React from "react";

export default function ModalDelete({title, id, deleteHandler}) {
	return (
		<div
			data-te-modal-init
			className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
			id="modalDelete"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div
				data-te-modal-dialog-ref
				className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out mx-auto mt-20 max-w-[320px] md:max-w-[490px]"
			>
				<div
					className="sm:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-xl border-none bg-white bg-clip-padding text-current shadow-lg outline-none"
					data-cy="modal-delete"
				>
					<div className="relative flex-auto flex flex-col gap-[26px] p-5 md:p-10" data-te-modal-body-ref>
						<div className="flex flex-col gap-2 items-center">
							<img src="../svg/ic-exclamation-triangle.svg" alt="" />
							<p className="text-center font-medium text-sm md:text-lg my-7 md:my-8">
								Apakah anda yakin menghapus activity <br className="hidden md:block" />
								<span className="font-bold">"{title}"</span>?
							</p>
							<div className="inline-flex gap-5">
								<button
									type="button"
									className="flex items-center text-xs md:text-lg font-semibold rounded-full px-[15px] md:px-7 py-2 md:py-3 disabled:bg-opacity-20 bg-secondary text-darkBrown"
									data-te-modal-dismiss
									aria-label="Close"
									data-cy="modal-delete-cancel-button"
								>
									Batal
								</button>
								<button
									type="button"
									className="flex items-center text-xs md:text-lg font-semibold rounded-full px-[15px] md:px-7 py-2 md:py-3 disabled:bg-opacity-20 bg-[#ED4C5C] text-white"
									data-te-modal-dismiss
									data-cy="modal-delete-confirm-button"
									onClick={() => deleteHandler(id)}
								>
									Hapus
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
