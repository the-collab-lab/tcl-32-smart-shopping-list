import React, { useEffect, useState } from 'react';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Item.css';
import DeleteItemButton from './DeleteItemButton';

function Item({ item, userToken, focusOnInput }) {
  const [checked, setChecked] = useState(false);
  const [daysSincePurchased, setDaysSincePurchased] = useState();

  useEffect(() => {
    if (item.lastPurchased) {
      const lastPurchasedSeconds = item.lastPurchased.seconds;
      const dateNowSeconds = Date.now() / 1000;
      const differenceInSeconds = dateNowSeconds - lastPurchasedSeconds;

      setDaysSincePurchased(differenceInSeconds / 86400);
    }
  }, [item]);

  useEffect(() => {
    if (daysSincePurchased > 1 || daysSincePurchased === null) {
      setChecked(false);
    } else if (daysSincePurchased < 1) {
      setChecked(true);
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
      setDaysSincePurchased(null);
    }
  };

  return (
    <li className="item">
      <form>
        <label htmlFor={`itemPurchased-${item.id}`}>Purchased</label>
        <input
          id={`itemPurchased-${item.id}`}
          type="checkbox"
          checked={checked}
          name="itemPurchased"
          onChange={handleCheckboxChange}
          onClick={updateLastPurchased}
        />
      </form>
      <p className="item-name">{item.itemName}</p>
      <DeleteItemButton
        item={item.id}
        userToken={userToken}
        focusOnInput={focusOnInput}
      />
    </li>
  );
}

export default Item;
