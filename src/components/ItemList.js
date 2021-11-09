import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import SearchList from './SearchList';

function ItemList({ userToken }) {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users', `${userToken}`, 'list'));

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setListItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );

    return unsubscribe;
  }, [userToken]);

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
