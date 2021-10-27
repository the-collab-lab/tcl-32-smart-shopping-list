import React from 'react';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import './AddItemForm.css';

function AddItemForm() {
  const normalizeValue = (value) => {
    const punctuationRegex = /[^\w]/gi;
    const emojiRegex = /[\u{1F600}-\u{1F64F}]/gu;
    return value
      .toLowerCase()
      .replace(punctuationRegex, '')
      .replace(emojiRegex, '');
  };

  const submitItem = async (event) => {
    event.preventDefault();
    const userToken = window.localStorage.getItem('userToken');
    const itemName = event.target.itemName.value;
    const itemNameNormalize = normalizeValue(itemName);
    const purchaseInterval = event.target.nextPurchase.value;
    const lastPurchased = event.target.lastPurchased.value || null;
    const checkItem = await isItemInDatabase(itemName, userToken);
    console.log('checkItem', checkItem);

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

  const isItemInDatabase = async (itemName, userToken) => {
    const q = query(
      collection(db, 'list'),
      where('userToken', '==', userToken),
      where('itemNameNormalize', '==', normalizeValue(itemName)),
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      console.log(doc.data().itemName);
    });
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
    await addDoc(collection(db, 'list'), {
      itemName: itemName,
      itemNameNormalize: itemNameNormalize,
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
