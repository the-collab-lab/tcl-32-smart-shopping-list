import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import Item from './Item.js';

function ItemList({ userToken }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users', `${userToken}`, 'list'));

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );

    return unsubscribe;
  }, [userToken]);

  return (
    <div>
      <div>
        {list.length === 0 ? (
          <NavLink className="addItemSubmitButton" to="/additem">
            Add Item
          </NavLink>
        ) : (
          list.map((item) => {
            return (
              <Item item={item} key={item.id} userToken={userToken}></Item>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ItemList;
