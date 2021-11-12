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

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        handleDelete={() => handleDelete(item)}
      >
        Are you sure you want to delete?
      </Modal>
    </div>
  );
}

export default DeleteItemButton;
