import React from 'react';
import ReactDom from 'react-dom';

const modalStyles = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%',
  backgroundColor: '#FFF',
  padding: '40px',
  zIndex: 1000,
  width: 200,
  borderRadius: '0.3rem',
  textAlign: 'center',
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

export default function Modal({ open, children }) {
  if (!open) return null;

  return ReactDom.createPortal(
    <div role="alert" aria-describedby="dialog-description">
      <div style={overlayStyles} />
      <div style={modalStyles}>{children}</div>
    </div>,
    document.getElementById('portal'),
  );
}
