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

  const handleUnCheck = async () => {
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    updateDoc(docRef, {
      lastPurchased: item.backupLastPurchased,
      numberOfPurchases: item.backupNumberOfPurchases,
      daysUntilNextPurchase: item.backupDaysUntilNextPurchase,
    });
  };

  const checkboxStyle =
    item.daysUntilNextPurchase >= 2 && item.daysUntilNextPurchase <= 7
      ? { backgroundColor: 'lightgreen' } // 2 thru 7 = lightgreen
      : item.daysUntilNextPurchase >= 8 && item.daysUntilNextPurchase <= 30
      ? { backgroundColor: 'lightblue' } // 8 thru 30 = lightblue
      : item.daysUntilNextPurchase > 30
      ? { backgroundColor: 'lightyellow' } // 31+ = lightyellow
      : { backgroundColor: 'lightgray' }; // anything else = lightgray

  const checkboxAriaLabel =
    item.daysUntilNextPurchase >= 2 && item.daysUntilNextPurchase <= 7
      ? `${item.itemName} state: buy soon. Marked as purchased.` // 2 thru 7 = lightgreen
      : item.daysUntilNextPurchase >= 8 && item.daysUntilNextPurchase <= 30
      ? `${item.itemName} state: buy kind of soon. Marked as purchased.` // 8 thru 30 = lightblue
      : item.daysUntilNextPurchase > 30
      ? `${item.itemName} state: buy not soon. Marked as purchased.` // 31+ = lightyellow
      : `${item.itemName} inactive. Marked as purchased.`; // anything else = lightgray

  return (
    <li className="item" style={checkboxStyle}>
      <form>
        <label htmlFor={`itemPurchased-${item.id}`}>Purchased</label>
        <input
          id={`itemPurchased-${item.id}`}
          type="checkbox"
          checked={checked}
          name="itemPurchased"
          onChange={handleCheckboxChange}
          aria-label={checkboxAriaLabel}
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
