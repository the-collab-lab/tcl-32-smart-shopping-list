import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import '../components/AddItemForm.css';

function List() {
  const [list, setList] = useState([]);
  const [sharedToken, setSharedToken] = useState([]);

  useEffect(() => {
    const sharedToken = window.localStorage.getItem('userToken');
    const q = query(collection(db, 'list', `${sharedToken}`, 'items'));

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );
    setSharedToken(sharedToken);
    return unsubscribe;
  }, [sharedToken]);

  return (
    <div>
      <h2>Shared list token: {sharedToken}</h2>
      <div>
        {list.length <= 1 ? (
          <NavLink className="addItemSubmitButton" to="/additem">
            Add Item
          </NavLink>
        ) : (
          list.map((item, i) => {
            return (
              <div key={i}>
                <ul>{item.itemName}</ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default List;
