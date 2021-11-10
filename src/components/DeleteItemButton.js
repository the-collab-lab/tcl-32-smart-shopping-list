import React from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';

const handleDelete = async ({ userToken, item }) => {
  const docRef = doc(db, 'users', userToken, 'list', item);
  await deleteDoc(docRef);
};

function DeleteItemButton(item) {
  return <button onClick={() => handleDelete(item)}>Delete</button>;
}

export default DeleteItemButton;
