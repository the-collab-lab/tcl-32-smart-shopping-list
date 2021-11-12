import React from 'react';
import ReactDom from 'react-dom';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000,
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.7)',
  zIndex: 1000,
};

export default function Modal({ open, children, onClose, handleDelete }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={overlayStyles} />
      <div style={modalStyles}>
        {children}
        <button onClick={handleDelete}>Yes</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </>,
    document.getElementById('portal'),
  );
}
