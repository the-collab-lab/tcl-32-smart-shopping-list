import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AddItemForm.css';
import { normalizeValue } from './Helper';

function AddItemForm() {
  const [toast, setToast] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);

  const token = window.localStorage.getItem('userToken');
  const submitItem = async (event) => {
    event.preventDefault();
    const userToken = window.localStorage.getItem('userToken');
    const itemName = event.target.itemName.value;
    const itemNameNormalize = normalizeValue(itemName);
    const purchaseInterval = event.target.nextPurchase.value;
    const lastPurchased = null;
    const checkItem = await isItemInDatabase(itemNameNormalize, userToken);

    if (!checkItem) {
      handleSubmission(
        itemName,
        itemNameNormalize,
        purchaseInterval,
        userToken,
        lastPurchased,
      );
      triggerItemAddedMessage();
      event.target.reset();
    } else {
      triggerFormValidationMessage();
      event.target.reset();
    }
  };

  const isItemInDatabase = async (itemNameNormalize, userToken) => {
    const q = query(
      collection(db, 'users', `${userToken}`, 'list'),
      where('itemNameNormalize', '==', itemNameNormalize),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length) {
      return true;
    } else {
      return false;
    }
  };

  const triggerFormValidationMessage = () => {
    const formInput = document.getElementById('itemName');
    setToast(true);
    formInput.onfocus = () => {
      setToast(false);
    };
  };

  const triggerItemAddedMessage = () => {
    setItemAdded(true);
    setTimeout(() => {
      setItemAdded(false);
    }, 3000);
  };

  const handleSubmission = async (
    itemName,
    itemNameNormalize,
    purchaseInterval,
    userToken,
    lastPurchased,
  ) => {
    await addDoc(collection(db, 'users', `${token}`, 'list'), {
      itemName: itemName,
      itemNameNormalize: itemNameNormalize,
      purchaseInterval: purchaseInterval,
      userToken: userToken,
      lastPurchased: lastPurchased,
      daysUntilNextPurchase: null,
      numberOfPurchases: 0,
      backupLastPurchased: lastPurchased,
      backupDaysUntilNextPurchase: null,
      backupNumberOfPurchases: 0,
    });
  };

  return (
    <form onSubmit={submitItem}>
      <div className="flex justify-center items-center">
        <label
          htmlFor="item"
          className="flex justify-center items-center text-lg font-bold text-gray-500 bg-white p-2 w-96 rounded-md mt-5 mb-2 border-2 py-1 px-3"
        >
          Item Name
          <input
            id="itemName"
            type="text"
            className="flex-grow outline-none text-gray-600 focus:text-blue-600"
          />
        </label>
        {toast ? (
          <p
            className="flex items-center font-sans font-medium tracking-wide text-white  text-xs mt-1 ml-1 p-1 bg-maroon-flush bg-opacity-90 text-center rounded-md"
            aria-label="Item is already in your list."
          >
            Item is already in your list.
          </p>
        ) : null}
      </div>
      <div className="item border-gray-400 flex flex-row mb-2">
        <label className="border-solid border-2 border-strong-lime-green shadow select-none dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 bg-white bg-opacity-90  justify-center">
          <input
            id="soon"
            type="radio"
            value="7"
            name="nextPurchase"
            required
            className="form-radio h-5 w-5"
          />
          Soon
        </label>
        <label className="border-solid border-2 border-maroon-flush shadow select-none dark:bg-gray-800 rounded-md flex-1 items-center p-4 bg-white bg-opacity-90 flex justify-center">
          <input
            id="kindOfSoon"
            type="radio"
            value="14"
            name="nextPurchase"
            required
            className="form-radio h-5 w-5"
          />
          Kind of Soon
        </label>
        <label className="border-solid border-2 border-red-damask shadow select-none dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 bg-white bg-opacity-90 justify-center">
          <input
            id="notSoon"
            type="radio"
            value="30"
            name="nextPurchase"
            required
            className="form-radio h-5 w-5"
          />
          Not Soon
        </label>
      </div>
      <div>
        <button
          id="addItem"
          type="submit"
          className="bg-red-damask text-white font-serif font-bold p-2 w-1/2 rounded-full hover:bg-maroon-flush focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2"
        >
          Add To List
        </button>
      </div>
      {itemAdded ? (
        <div className="flex items-center text-white max-w-sm w-full bg-strong-lime-green bg-opacity-60 shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="w-10 border-r px-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
          </div>

          <div className="flex items-center px-2 py-3">
            <div className="mx-3">
              <p aria-label="Item added!">Item added!</p>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}

export default AddItemForm;
