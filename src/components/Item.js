import React, { useEffect, useState } from 'react';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
import './Item.css';
import DeleteItemButton from './DeleteItemButton';
import { calculateDaysSincePurchased, isActive } from './Helper';

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
        10,
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

  let itemClass = '';
  let nameAriaLabel = '';

  switch (true) {
    case !isActive(item, daysSincePurchased):
      itemClass = 'bg-gray-300';
      nameAriaLabel = `${item.itemName}. is inactive.`;
      break;
    case item.daysUntilNextPurchase >= 2 && item.daysUntilNextPurchase <= 7:
      itemClass = 'bg-strong-lime-green';
      nameAriaLabel = `${item.itemName}. estimated purchase time is soon`;
      break;
    case item.daysUntilNextPurchase >= 8 && item.daysUntilNextPurchase <= 30:
      itemClass = 'bg-maroon-flush';
      nameAriaLabel = `${item.itemName}. estimated purchase time is kind of soon.`;
      break;
    case item.daysUntilNextPurchase > 30:
      itemClass = 'bg-red-damask';
      nameAriaLabel = `${item.itemName}. estimated purchase time is not soon.`;
      break;
    default:
      itemClass = 'bg-gray-300';
      nameAriaLabel = `${item.itemName}. is inactive.`;
  }

  return (
    <li className="item border-gray-400 flex flex-row mb-2 w-9/12 md:w-2/4">
      <div
        className={`${itemClass} shadow select-none cursor-pointer dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 bg-opacity-60`}
      >
        <div className="flex flex-col w-5 h-5 justify-center items-center mr-4">
          <form>
            <input
              id={`itemPurchased-${item.id}`}
              type="checkbox"
              aria-label={nameAriaLabel}
              checked={checked}
              name="itemPurchased"
              onChange={handleCheckboxChange}
            />
          </form>
        </div>
        <div className="flex-1 pl-1 md:mr-20 flex flex-row justify-center">
          <p className="font-sans font-bold" aria-hidden="true">
            {item.itemName}
          </p>
        </div>
        <DeleteItemButton
          item={item.id}
          userToken={userToken}
          focusOnInput={focusOnInput}
        />
      </div>
    </li>
  );
}

export default Item;
