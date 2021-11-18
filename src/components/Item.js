import React, { useEffect, useState } from 'react';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import './Item.css';
import DeleteItemButton from './DeleteItemButton';
import { calculateDaysSincePurchased } from './Helper';

function Item({ item, userToken, focusOnInput }) {
  const [checked, setChecked] = useState(false);
  const [daysSincePurchased, setDaysSincePurchased] = useState(0);

  useEffect(() => {
    if (item.lastPurchased) {
      setDaysSincePurchased(calculateDaysSincePurchased(item.lastPurchased));
    }
  }, [item]);

  useEffect(() => {
    if (daysSincePurchased < 1 && daysSincePurchased !== 0) {
      setChecked(true);
      return;
    }

    setChecked(false);
  }, [daysSincePurchased]);

  const handleCheckboxChange = () => {
    if (!checked) {
      handleCheck();
    } else {
      handleUnCheck();
    }

    setChecked(!checked);
  };

  const handleCheck = async () => {
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    updateDoc(docRef, {
      backupLastPurchased: item.lastPurchased,
      backupDaysUntilNextPurchase: item.daysUntilNextPurchase,
      backupNumberOfPurchases: item.numberOfPurchases,
      lastPurchased: serverTimestamp(),
      numberOfPurchases: item.numberOfPurchases + 1,
      daysUntilNextPurchase: parseInt(
        calculateEstimate(
          item.purchaseInterval,
          daysSincePurchased,
          item.numberOfPurchases,
        ),
      ),
    });
  };

  // const daysSincePurchasedWhole = daysSincePurchased.toFixed(0)

  const handleUnCheck = async () => {
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    updateDoc(docRef, {
      lastPurchased: item.backupLastPurchased,
      numberOfPurchases: item.backupNumberOfPurchases,
      daysUntilNextPurchase: item.backupDaysUntilNextPurchase,
    });
  };

  return (
    <li
      className="item"
      style={
        item.daysUntilNextPurchase >= 2 && item.daysUntilNextPurchase <= 7
          ? { backgroundColor: 'lightgreen' } // 2 thru 7 = lightgreen
          : item.daysUntilNextPurchase >= 8 && item.daysUntilNextPurchase <= 30
          ? { backgroundColor: 'lightblue' } // 8 thru 30 = lightblue
          : { backgroundColor: 'lightgray' } // anything else = lightgray
      }
    >
      <form>
        <label htmlFor={`itemPurchased-${item.id}`}>Purchased</label>
        <input
          id={`itemPurchased-${item.id}`}
          type="checkbox"
          checked={checked}
          name="itemPurchased"
          onChange={handleCheckboxChange}
        />
      </form>
      <p className="item-name">{item.itemName}</p>
      <p className="item-name">
        daysUntilNextPurchase {item.daysUntilNextPurchase} day(s)
      </p>
      <p className="item-name">daysSincePurchased: {daysSincePurchased}</p>
      <DeleteItemButton
        item={item.id}
        userToken={userToken}
        focusOnInput={focusOnInput}
      />
    </li>
  );
}

export default Item;
