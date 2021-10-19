import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AddItemForm.css';

function AddItemForm() {
  const [item, setItem] = useState([]);

  const submitItem = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem('userToken');

    const itemName = event.target.itemName.value;
    const purchaseInterval = event.target.nextPurchase.value;
    const userToken = token;
    const lastPurchased = event.target.lastPurchased.value;
    console.log('test: ', itemName, purchaseInterval, userToken, lastPurchased);
    handleSubmission(itemName, purchaseInterval, userToken, lastPurchased);
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

  // This is for testing the data being sent to firestore (should be repurposed in the list view later.)
  useEffect(
    () =>
      onSnapshot(collection(db, 'list'), (snapshot) =>
        setItem(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      ),
    [],
  );
  console.log('Items from database:', item);

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
          Last Purchased Date:
          <input
            id="lastPurchased"
            type="int"
            value={null}
            name="lastPurchased"
          />
        </label>
      </div>
      <button id="addItem" type="submit" className="addItemSubmitButton">
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
