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
      {listItems.length === 0 ? (
        <NavLink
          className="block flex justify-center items-center text-maroon-flush bg-white rounded-full mx-auto h-10 w-9/12 font-serif font-bold hover:bg-maroon-flush hover:text-white transition duration-500"
          to="/additem"
        >
          Add Item
        </NavLink>
      ) : (
        <SearchList listItems={listItems} userToken={userToken} />
      )}
    </div>
  );
}

export default ItemList;
