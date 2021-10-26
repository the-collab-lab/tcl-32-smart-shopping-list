import React from 'react';
import { db } from '../lib/firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

export default function TokenForm({ createTokenAndSaveToLocalStorage }) {
  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    const token = e.target.sharedToken.value;
    const listRef = collection(db, 'list');
    const q = query(listRef, where('userToken', '==', token));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length) {
      createTokenAndSaveToLocalStorage(token);
    } else {
      alert('Error: This token does not exist');
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleTokenSubmit}>
      <label>
        <input placeholder="Enter Token Here" type="text" id="sharedToken" />
      </label>
      <button id="addToken" type="submit" className="addTokenSubmitButton">
        Add Token
      </button>
    </form>
  );
}
