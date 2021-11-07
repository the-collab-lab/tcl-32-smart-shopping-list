import React, { useEffect, useState } from 'react';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import './Item.css';

function Item({ item, userToken }) {
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
    if (daysSincePurchased > 1) {
      if (checked) {
        setChecked(false);
      }
    } else if (daysSincePurchased < 1) {
      setChecked(true);
    }

    if (daysSincePurchased === null) {
      setChecked(false);
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
    <div className="item">
      <form>
        <label htmlFor="itemPurchased">Purchased</label>
        <input
          id="itemPurchased"
          type="checkbox"
          checked={checked}
          name="itemPurchased"
          onChange={handleCheckboxChange}
          onClick={updateLastPurchased}
        />
      </form>
      <p className="item-name">{item.itemName}</p>
    </div>
  );
}

export default Item;
