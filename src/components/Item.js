import React, { useEffect } from 'react';
import '../components/AddItemForm.css';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { useState } from 'react/cjs/react.development';
import { db } from '../lib/firebase';

function Item({ item, i }) {
  const [checked, setChecked] = useState(false);
  const [durationSincePurchased, setDurationSincePurchased] = useState(null);
  const userToken = window.localStorage.getItem('userToken');

  const lastPurchased = item.lastPurchased.toDate();
  console.log('lastPurchased', lastPurchased);

  console.log(`24hours = ${Math.floor(item.lastPurchased / 86400)}`);

  const updateLastPurchased = async (item) => {
    console.log(item.id);
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    await updateDoc(docRef, {
      lastPurchased: serverTimestamp(),
    });
    console.log(serverTimestamp(item.id));
  };
  return (
    <div>
      <div key={i}>
        <ul>{item.itemName}</ul>
        <form>
          <label>
            <input
              id="itemPurchased"
              type="checkbox"
              value=""
              name="itemPurchased"
              onClick={() => updateLastPurchased(item)}
            />
            Purchased
            {/* <input
              value={console.log('Null: ', null)}
              name="itemPurchased"
              type="hidden"
            /> */}
          </label>
        </form>
      </div>
    </div>
  );
}

export default Item;
