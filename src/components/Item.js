import React, { useEffect, useState } from 'react';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import './Item.css';

function Item({ item, userToken }) {
  const [checked, setChecked] = useState(false);
  const [daysSincePurchased, setDaysSincePurchased] = useState(0);
  const [itemBackup] = useState(item);

  useEffect(() => {
    if (item.lastPurchased) {
      const lastPurchasedSeconds = item.lastPurchased.seconds;
      const dateNowSeconds = Date.now() / 1000;
      const differenceInSeconds = dateNowSeconds - lastPurchasedSeconds;

      setDaysSincePurchased(differenceInSeconds / 86400);
    }
  }, [item]);

  useEffect(() => {
    if (daysSincePurchased < 1 && daysSincePurchased !== 0) {
      setChecked(true);
      return;
    }

    setChecked(false);
  }, [daysSincePurchased, checked]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const updateLastPurchased = async (event) => {
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    if (event.target.checked) {
      updateDoc(docRef, {
        lastPurchased: serverTimestamp(),
        numberOfPurchases: item.numberOfPurchases + 1,
        daysUntilNextPurchase: calculateEstimate(
          item.purchaseInterval,
          daysSincePurchased,
          item.numberOfPurchases,
        ),
      });
    } else {
      updateDoc(docRef, {
        lastPurchased: itemBackup.lastPurchased,
        numberOfPurchases: itemBackup.numberOfPurchases,
        daysUntilNextPurchase: itemBackup.daysUntilNextPurchase,
      });
      setDaysSincePurchased(0);
    }
  };

  return (
    <li className="item">
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
    </li>
  );
}

export default Item;
