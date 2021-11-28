import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, where, query, getDocs } from 'firebase/firestore';

export default function TokenForm({ grabExistingTokenAndSaveToLocalStorage }) {
  const [toast, setToast] = useState(false);

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    const token = e.target.sharedToken.value;
    const userRef = collection(db, 'users');
    const q = query(userRef, where('userToken', '==', token));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length) {
      grabExistingTokenAndSaveToLocalStorage(e.target.sharedToken.value);
    } else {
      triggerFormValidationMessage();
      e.target.reset();
    }
  };

  const triggerFormValidationMessage = () => {
    const formInput = document.getElementById('sharedToken');
    setToast(true);
    formInput.onfocus = () => {
      setToast(false);
    };
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center my-10 w-9/12 md:w-full bg-green-50 bg-opacity-50 rounded-md">
      <form
        onSubmit={handleTokenSubmit}
        className="flex-1 flex flex-col align justify-center items-center mt-8 w-full"
      >
        {toast ? (
          <p
            className="flex items-center font-sans font-medium tracking-wide text-white  text-xs mt-1 ml-1 p-1 m-1 bg-maroon-flush bg-opacity-90 text-center rounded-md"
            aria-label="This token does not exist."
          >
            This token does not exist.
          </p>
        ) : null}
        <label className="block">
          <input
            placeholder="Enter Token Here"
            type="text"
            id="sharedToken"
            className="w-full rounded-md bg-white bg-opacity-90 border-gray-300 border-2 focus:bg-white focus:border-strong-lime-green focus:ring-0 text-center font-sans focus:placeholder-transparent"
          />
        </label>

        <button
          id="addToken"
          type="submit"
          className="text-strong-lime-green bg-gray-700 mt-2 rounded-full h-10 w-8/12 font-serif font-bold hover:bg-strong-lime-green hover:text-gray-700 transition duration-500"
        >
          Add Token
        </button>
      </form>
    </div>
  );
}
