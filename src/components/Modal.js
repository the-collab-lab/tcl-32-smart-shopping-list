import React from 'react';
import ReactDom from 'react-dom';
import FocusTrap from 'focus-trap-react';

export default function Modal({ open, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <FocusTrap>
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div>{children}</div>
        </div>
      </div>
    </FocusTrap>,
    document.getElementById('portal'),
  );
}
