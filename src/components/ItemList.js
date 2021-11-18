import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import SearchList from './SearchList';
import { calculateDaysSincePurchased } from './Helper';

function ItemList({ userToken }) {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'users', `${userToken}`, 'list'),
      orderBy('itemNameNormalize', 'asc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setListItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );

    return unsubscribe;
  }, [userToken]);

  /*
         | itemA | itemB |
  active | T     | T     | -> compare daysUntilNextPurchase
         | T     | F     | -> return 1, itemA goes before itemB
         | F     | T     | -> return -1, itemB goes before itemA
         | F     | F     | -> compare daysUntilNextPurchase
  */

  const isActive = (item) =>
    item !== null &&
    (item.daysSincePurchased * 2 <= item.daysUntilNextPurchase ||
      item.numberOfPurchases > 1);

  listItems.sort((itemA, itemB) => {
    if (
      (isActive(itemA) && isActive(itemB)) ||
      (!isActive(itemA) && !isActive(itemB))
    ) {
      return itemB.daysUntilNextPurchase - itemA.daysUntilNextPurchase;
    }

    if (isActive(itemA)) {
      return -1;
    }
    return 1;
  });

  return (
    <div>
      <div>
        {listItems.length === 0 ? (
          <NavLink className="addItemSubmitButton" to="/additem">
            Add Item
          </NavLink>
        ) : (
          <SearchList listItems={listItems} userToken={userToken} />
        )}
      </div>
    </div>
  );
}

export default ItemList;
