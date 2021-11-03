import React, { useEffect } from 'react';
import '../components/AddItemForm.css';
import { updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { useState } from 'react/cjs/react.development';
import { db } from '../lib/firebase';

function Item({ item, i }) {
  const [checked, setChecked] = useState(false);
  const [durationSincePurchased, setDurationSincePurchased] = useState(null);
  const userToken = window.localStorage.getItem('userToken');

  // const newDate = new Date()
  // console.log('Date', newDate)
  // console.log('lastPurchased converted to date', item.lastPurchased.toDate())
  // console.log('difference in timestamps (seconds)', (newDate - item.lastPurchased.toDate())/1000)
  //https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now

  useEffect(() => {
    // set state variable durationSincePurchased
    if (item.lastPurchased) {
      const lastPurchasedSeconds = item.lastPurchased.seconds;
      const dateNowSeconds = Date.now() / 1000;
      const differenceInSeconds = dateNowSeconds - lastPurchasedSeconds;
      console.log('lastPurchased in seconds', lastPurchasedSeconds);
      console.log('Date.now in seconds', dateNowSeconds);
      console.log('difference in seconds', differenceInSeconds);

      console.log(`per/24hrs = ${differenceInSeconds / 86400}`);
      // change name durationSincePurchased to daysSincePurchased?
      setDurationSincePurchased(differenceInSeconds / 86400);
    }
  }, [item]);

  const updateLastPurchased = async (event) => {
    console.log(item.id);
    const docRef = doc(db, 'users', `${userToken}`, 'list', item.id);
    await updateDoc(docRef, {
      lastPurchased: serverTimestamp(),
    });
    console.log(serverTimestamp(item.id));
    console.log('value', event.target.checked); // prints true if checked and false if unchecked
  };

  return (
    <div>
      <ul>{item.itemName}</ul>
      <form>
        <label>
          <input
            id="itemPurchased"
            type="checkbox"
            value=""
            name="itemPurchased"
            onClick={updateLastPurchased} // updated this line
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
  );
}

export default Item;
