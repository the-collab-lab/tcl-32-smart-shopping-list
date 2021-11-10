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
      nextPurchase: null,
      numberOfPurchases: 0,
    });
  };

  return (
    <form onSubmit={submitItem} className="addItemForm">
      <label htmlFor="item">
        Item Name
        <input id="itemName" type="text" />
      </label>
      <div className="nextPurchaseRadioGroup">
        <label>
          <input
            id="soon"
            type="radio"
            value="7"
            name="nextPurchase"
            required
          />
          Soon
        </label>
        <label>
          <input
            id="kindOfSoon"
            type="radio"
            value="14"
            name="nextPurchase"
            required
          />
          Kind of Soon
        </label>
        <label>
          <input
            id="notSoon"
            type="radio"
            value="30"
            name="nextPurchase"
            required
          />
          Not Soon
        </label>
      </div>
      <button id="addItem" type="submit" className="addItemSubmitButton">
        Add To List
      </button>
    </form>
  );
}

export default AddItemForm;
