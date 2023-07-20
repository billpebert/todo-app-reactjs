import ReactDOM from 'react-dom';
import ExclamationTriangle from "../components/icon/ExclamationTriangle"

export default function ModalDelete({ title, id, deleteHandler, closeModal }) {

	return ReactDOM.createPortal(
		<>
			{/* Backdrop */}
			<div
				data-te-modal-init
				className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-slate-900 bg-opacity-50 transition-opacity"
				id="modalDelete"
				onClick={() => closeModal()}
			></div>
			
			<div
				className="pointer-events-none w-auto opacity-100 transition-all duration-300 ease-in-out mx-auto max-w-[320px] md:max-w-[490px] fixed z-[1056] inset-x-0 top-1/2 -translate-y-1/2"
				data-cy="modal-delete"
			>
				<div className="sm:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-xl border-none bg-white bg-clip-padding text-current shadow-lg outline-none">
					<div className="relative flex-auto flex flex-col gap-[26px] p-5 md:p-10">
						<div className="flex flex-col gap-2 items-center">
							<ExclamationTriangle/>
							<p
								className="text-center font-medium text-sm md:text-lg my-7 md:my-8"
								data-cy="modal-delete-title"
							>
								Apakah anda yakin menghapus activity <br className="hidden md:block" />
								<span className="font-bold">"{title}"</span>?
							</p>
							<div className="inline-flex gap-5">
								<button
									type="button"
									className="flex items-center text-xs md:text-lg font-semibold rounded-full px-[15px] md:px-7 py-2 md:py-3 disabled:bg-opacity-20 bg-secondary text-darkBrown"
									aria-label="Close"
									data-cy="modal-delete-cancel-button"
									onClick={() => closeModal()}
								>
									Batal
								</button>
								<button
									type="button"
									className="flex items-center text-xs md:text-lg font-semibold rounded-full px-[15px] md:px-7 py-2 md:py-3 disabled:bg-opacity-20 bg-[#ED4C5C] text-white"
									data-cy="modal-delete-confirm-button"
									onClick={() => {deleteHandler(id); closeModal()}}
								>
									Hapus
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>

		, document.body
	);
}
