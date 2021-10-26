import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AddItemForm.css';

function AddItemForm() {
  const submitItem = (event) => {
    event.preventDefault();
    const userToken = window.localStorage.getItem('userToken');
    const itemName = event.target.itemName.value;
    const purchaseInterval = event.target.nextPurchase.value;
    const lastPurchased = event.target.lastPurchased.value || null;
    handleSubmission(itemName, purchaseInterval, userToken, lastPurchased);
    event.target.reset();
    alert('Item added!');
  };

  const handleSubmission = async (
    itemName,
    purchaseInterval,
    userToken,
    lastPurchased,
  ) => {
    await addDoc(collection(db, 'list'), {
      itemName: itemName,
      purchaseInterval: purchaseInterval,
      userToken: userToken,
      lastPurchased: lastPurchased,
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
          <input id="soon" type="radio" value="7" name="nextPurchase" />
          Soon
        </label>
        <label>
          <input id="kindOfSoon" type="radio" value="14" name="nextPurchase" />
          Kind of Soon
        </label>
        <label>
          <input id="notSoon" type="radio" value="30" name="nextPurchase" />
          Not Soon
        </label>
        <label>
          Last Purchased Date (optional)
          <input id="lastPurchased" type="int" name="lastPurchased" />
        </label>
      </div>
      <button id="addItem" type="submit" className="addItemSubmitButton">
        Add To List
      </button>
    </form>
  );
}

export default AddItemForm;
