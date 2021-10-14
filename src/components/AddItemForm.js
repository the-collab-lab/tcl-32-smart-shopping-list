import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

function AddItemForm() {
  const [item, setItem] = useState([]);
  const token = window.localStorage.getItem('userToken');
  console.log('Token: ', token);

  const submitItem = async (itemName, purchaseInterval, userToken) => {
    console.log(...itemName, purchaseInterval, userToken);
    await addDoc(collection(db, 'listTest'), {
      itemName: itemName,
      purchaseInterval: purchaseInterval,
      userToken: userToken,
    });
  };

  // This is for testing the data being sent to firestore (should be repurposed in the list view later.)
  useEffect(
    () =>
      onSnapshot(collection(db, 'listTest'), (snapshot) =>
        setItem(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      ),
    [],
  );
  console.log('Items from database:', item);

  return (
    <form>
      <label htmlFor="item">
        Item
        <input id="itemName" type="text" />
      </label>
      <div>
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
      </div>
      <button id="addItem" type="submit" onClick={submitItem}>
        Add Item
      </button>
    </form>
  );
}

export default AddItemForm;
