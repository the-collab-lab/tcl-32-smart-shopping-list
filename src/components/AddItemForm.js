import React from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AddItemForm.css';
import { normalizeValue } from './Helper';

function AddItemForm() {
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
      event.target.reset();
      alert('Item added!');
    } else {
      alert('Item is already in your list');
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
      </div>
      <div className="item border-gray-400 flex flex-row mb-2">
        <label className="border-solid border-2 border-strong-lime-green shadow select-none dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 bg-white bg-opacity-90 flex justify-center items-center">
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
        <label className="border-solid border-2 border-maroon-flush shadow select-none dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 bg-white bg-opacity-90 flex justify-center items-center">
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
        <label className="border-solid border-2 border-red-damask shadow select-none dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 bg-white bg-opacity-90 flex justify-center items-center">
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
          className="bg-red-damask font-semibold text-white font-serif font-bold p-2 w-1/2 rounded-full hover:bg-maroon-flush focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 m-2"
        >
          Add To List
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;
