import React from 'react'

export default function AlertToast({message}) {
  return (
    <div className="fixed top-8 right-4 md:top-5 md:right-5" data-cy="modal-information">
        <div className="pointer-events-auto mx-auto hidden w-96 max-w-full rounded-lg bg-white text-sm shadow-md shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
            id="toastTodoAlert" role="alert" aria-live="assertive" aria-atomic="true"
            data-te-autohide="true" data-te-toast-init data-te-toast-show data-te-animation="true"
            data-te-class-fade-in>
            <div className="flex items-center rounded-xl bg-white px-6 py-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" data-cy="modal-information-icon">
                    <path
                        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                        stroke="#00A790" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8V12" stroke="#00A790" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                    <path d="M12 16H12.01" stroke="#00A790" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round" />
                </svg>
                <p className="font-medium text-sm text-dark ml-[10px]" data-cy="modal-information-title">{message}</p>
            </div>
        </div>
    </div>
  )
}
