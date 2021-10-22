import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

function List() {
  const [list, setList] = useState([]);
  const [sharedToken, setSharedToken] = useState([]);

  useEffect(() => {
    const sharedToken = window.localStorage.getItem('userToken') || null;
    if (sharedToken === null) {
      alert('This token is invalid. Try again');
    }
    const q = query(
      collection(db, 'list'),
      where('userToken', '==', sharedToken),
    );

    const unsubscribe = onSnapshot(q, (snapshot) =>
      setList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
    );

    return unsubscribe;
  }, [sharedToken]);

  return (
    <div>
      <div>
        <h2>List token: {sharedToken}</h2>
        {list.map((item, i) => {
          return (
            <div key={i}>
              <ul>{item.itemName}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
