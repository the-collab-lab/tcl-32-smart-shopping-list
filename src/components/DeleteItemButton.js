import React, { useState } from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import Modal from './Modal';

function DeleteItemButton(item) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async ({ userToken, item, onClose }) => {
    setIsOpen(false);
    const docRef = doc(db, 'users', userToken, 'list', item);
    await deleteDoc(docRef);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Delete</button>

      <Modal open={isOpen}>
        <p id="dialog-description">Are you sure you want to delete?</p>
        <button onClick={() => handleDelete(item)}>Yes</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default DeleteItemButton;
