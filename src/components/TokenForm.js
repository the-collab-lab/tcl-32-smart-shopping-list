import React from 'react';
import { db } from '../lib/firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

export default function TokenForm({ grabExistingTokenAndSaveToLocalStorage }) {
  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    const token = e.target.sharedToken.value;
    const userRef = collection(db, 'users');
    const q = query(userRef, where('userToken', '==', token));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length) {
      grabExistingTokenAndSaveToLocalStorage(e.target.sharedToken.value);
    } else {
      alert('Error: This token does not exist');
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleTokenSubmit}>
      <label className="block">
        <input
          placeholder="Enter Token Here"
          type="text"
          id="sharedToken"
          className="w-7/12 md:w-1/2 rounded-md bg-white bg-opacity-90 border-gray-300 border-2 focus:bg-white focus:border-strong-lime-green focus:ring-0 text-center focus:placeholder-transparent"
        />
      </label>
      <button id="addToken" type="submit" className="addTokenSubmitButton">
        Add Token
      </button>
    </form>
  );
}
