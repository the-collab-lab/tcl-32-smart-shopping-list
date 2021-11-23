import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import SearchList from './SearchList';
import { calculateDaysSincePurchased, isActive } from './Helper.js';

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

  listItems.sort((itemA, itemB) => {
    if (
      (isActive(itemA, calculateDaysSincePurchased(itemA.lastPurchased)) &&
        isActive(itemB, calculateDaysSincePurchased(itemB.lastPurchased))) ||
      (!isActive(itemA, calculateDaysSincePurchased(itemA.lastPurchased)) &&
        !isActive(itemB, calculateDaysSincePurchased(itemB.lastPurchased)))
    ) {
      return itemA.daysUntilNextPurchase - itemB.daysUntilNextPurchase;
    }

    if (isActive(itemA, calculateDaysSincePurchased(itemA.lastPurchased))) {
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
