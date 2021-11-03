import React, { useEffect } from 'react';
import '../components/AddItemForm.css';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { useState } from 'react/cjs/react.development';
import { db } from '../lib/firebase';

function Item({ item, i }) {
  const [checked, setChecked] = useState(false);
  const [daysSincePurchased, setDaysSincePurchased] = useState(null);
  const userToken = window.localStorage.getItem('userToken');

  useEffect(() => {
    if (item.lastPurchased) {
      const lastPurchasedSeconds = item.lastPurchased.seconds;
      const dateNowSeconds = Date.now() / 1000;
      const differenceInSeconds = dateNowSeconds - lastPurchasedSeconds;

      setDaysSincePurchased(differenceInSeconds / 86400);
      if (differenceInSeconds / 86400 < 1) {
        setChecked(true);
      }
    }
  }, [item]);

  useEffect(() => {
    if (daysSincePurchased > 1) {
      if (checked) {
        setChecked(false);
      }
    }
  }, [daysSincePurchased, checked]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const updateLastPurchased = async (event) => {
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    if (event.target.checked) {
      await updateDoc(docRef, {
        lastPurchased: serverTimestamp(),
      });
    } else {
      await updateDoc(docRef, {
        lastPurchased: null,
      });
    }
  };

  return (
    <div>
      <ul>{item.itemName}</ul>
      <form>
        <label>
          <input
            id="itemPurchased"
            type="checkbox"
            checked={checked}
            name="itemPurchased"
            onChange={handleCheckboxChange}
            onClick={updateLastPurchased}
          />
          Purchased
        </label>
      </form>
    </div>
  );
}

export default Item;
