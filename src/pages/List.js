import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { NavLink } from 'react-router-dom';
import '../components/AddItemForm.css';
import SearchList from '../components/SearchList';

function List() {
  const [list, setList] = useState([]);
  const [sharedToken, setSharedToken] = useState([]);

  useEffect(() => {
    const sharedToken = window.localStorage.getItem('userToken');
    const q = query(collection(db, 'users', `${sharedToken}`, 'list'));

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
        {list.length === 0 ? (
          <NavLink className="addItemSubmitButton" to="/additem">
            Add Item
          </NavLink>
        ) : (
          <SearchList list={list} />
        )}
      </div>
    </div>
  );
}

export default List;
