import React, { useState, useEffect } from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import Modal from './Modal';

function DeleteItemButton({ item, userToken, focusOnInput }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async ({ userToken, item, focusOnInput }) => {
    setIsOpen(false);
    const docRef = doc(db, 'users', userToken, 'list', item);
    await deleteDoc(docRef);
    focusOnInput();
  };

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Delete</button>

      <Modal open={isOpen}>
        <p>Are you sure you want to delete?</p>
        <button
          onClick={() => handleDelete({ item, userToken, focusOnInput })}
          aria-label="Yes, delete this item."
        >
          Yes
        </button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default DeleteItemButton;
