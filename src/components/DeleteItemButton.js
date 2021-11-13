import React, { useState, useRef } from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import Modal from './Modal';

function DeleteItemButton(item) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleDelete = async ({ userToken, item, onClose }) => {
    setIsOpen(false);
    const docRef = doc(db, 'users', userToken, 'list', item);
    await deleteDoc(docRef);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    modalRef.current.focus();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Delete</button>

      <Modal open={isOpen} ref={modalRef}>
        <p id="dialog-description">Are you sure you want to delete?</p>
        <button onClick={() => handleDelete(item)}>Yes</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default DeleteItemButton;
